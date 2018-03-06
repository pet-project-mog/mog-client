import React, {Component} from 'react';
import {Form, Button, Divider, Search, Label} from 'semantic-ui-react'
import form from './form.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PropostaForm extends Component {

    defaultOptions = [
        {value: "FJ-11", text: "Java e Orientação a objetos"},
        {value: "FJ-21", text: "Java e Desenvolvimento Web"},
        {value: "FJ-22", text: "Desenvolvimento na prática com spring e testes"}
    ];

    state = {
        client: {},
        selectedCourses: [],
    };




    handleChange = (event, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => { };

    resultRender = ({text, value}) => <Label key={value} color={"blue"} >{value} - {text}</Label>;

    resetSearch = () => this.setState({isLoading: false, results:[], value: ''});

    handleResultSelect = (e, {result}) => {
        this.resetSearch();
        let {selectedCourses} = this.state;


        if (selectedCourses.includes(result)) {
            return
        }

        selectedCourses.push(result);


        this.setState({selectedCourses});
    };

    handleSearchCourse = (event, {value}) => {
        this.setState({isLoading:true, value});


        setTimeout( () => {

            if (this.state.value.length < 1) return this.resetSearch();

            let results = [];
            let search = value.toLowerCase();

            this.defaultOptions
                .filter((o) => o.value.toLowerCase().includes(search) || o.text.toLowerCase().includes(search))
                .forEach((o) => results.push(o));

            this.setState({isLoading: false, results})

        }, 500);




    };

    removeSelectedCourse(event, course){
        let {selectedCourses} = this.state;

        const index = selectedCourses.indexOf(course);

        selectedCourses.splice(index, 1);

        this.setState({selectedCourses});

    }

    reorder = (list, startIndex, endIndex) => {

        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    onDragEnd = (result) => {


        // Dropado fora da lista
        if (!result.destination) {
            return;
        }

        // Mágica
        const items = this.reorder(
            this.state.selectedCourses,
            result.source.index,
            result.destination.index
        );


        this.setState({selectedCourses: items});

    };

    componentWillMount(){
        this.resetSearch();
    };


    render() {

        const {client, isLoading, results, value, selectedCourses} = this.state;

        return (
            <div className={form.content}>


                <h1>Cadastro de propostas</h1>


                <Divider horizontal>Dados do cliente</Divider>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>
                        <Form.Input label="Nome" name="client.name" placeholder="João da Silva"
                                    content={client.name} onChange={this.handleChange} required/>
                    </Form.Field>


                    <Form.Field>
                        <Form.Input label="Endereço" name="client.address" placeholder="Rua dos bobos, nº 0"
                                    content={client.address} onChange={this.handleChange} required/>
                    </Form.Field>


                    <Divider horizontal>Cursos</Divider>

                    <Form.Field>
                        <Search minCharacters={2} loading={isLoading}
                                placeholder="FJ-11"
                                results={results}
                                value={value}
                                resultRenderer={this.resultRender}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleSearchCourse}
                                />
                    </Form.Field>





                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable"  >
                            {(provided) => (
                                <div ref={provided.innerRef} className={form.courses}>
                                    { selectedCourses.map((option, index) => {

                                        let {text, value} = option;

                                        return (
                                                <Draggable draggableId={value} index={index} key={index}>
                                                    {(provided) => (
                                                        <div>
                                                            <div className={form.course_item}
                                                                   ref={provided.innerRef}
                                                                   {...provided.draggableProps}
                                                                   {...provided.dragHandleProps}
                                                            >
                                                                {value} - {text}

                                                                <a href="#" className={form.couse_item_close} onClick={(e) => this.removeSelectedCourse(e, option)}/>

                                                            </div>
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Draggable>

                                        )
                                    })}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>


                    <Button type='submit'>Salvar</Button>

                </Form>
            </div>
        );
    }
}

export default PropostaForm;