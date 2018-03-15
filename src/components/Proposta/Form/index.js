import React, {Component} from 'react';
import {Form, Button, Divider, Search} from 'semantic-ui-react'
import form from './form.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Course, CourseOptionDTO} from '../../../domains';


class PropostaForm extends Component {

    defaultOptions = [];

    state = {
        client: {},
        selectedCourses: [],
    };


    handleChange = (event, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {

        const {selectedCourses, client} = this.state;
        const courses = selectedCourses.map(course => {return {code: course.value, platform: course.platform}})

        const payload = {   commercialName: client.commercialName,
                            businessName: client.name,
                            cnpj: client.cnpj,
                            courses: courses
                        };

        const headers = {'Content-Type': 'application/json'};
        const request = {method: 'post', body: JSON.stringify(payload), headers }

        fetch("http://localhost:8080/offers", request)
            .then(response => this.props.history.push("/offers"));
    };

    resultRender = (option) => {
        const {course} = option;

        return <div key={course.code} className={form.course_item}>{course.name}</div>
    } ;

    resetSearch = () => this.setState({isLoading: false, results: [], value: ''});

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
        this.setState({isLoading: true, value});

        setTimeout(() => {

            if (this.state.value.length < 1) return this.resetSearch();

            let results = [];
            let search = value.toLowerCase();

            this.defaultOptions
                .filter((o) => o.value.toLowerCase().includes(search) || o.text.toLowerCase().includes(search))
                .forEach((o) => results.push(o));

            this.setState({isLoading: false, results})

        }, 500);


    };

    removeSelectedCourse(event, course) {
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

    componentWillMount() {
        fetch("http://localhost:8080/courses")
            .then( response => response.json())
            .then( (values) => values.map( (json) => new Course(json) ) )
            .then( (courses) => courses.map( (course) => new CourseOptionDTO(course) ) )
            .then( (options) => { this.defaultOptions = options } );

        this.resetSearch();
    };


    render() {

        const {client, isLoading, results, value, selectedCourses} = this.state;
        const disableSubmmit = selectedCourses.length === 0;
        return (
            <div className={form.content}>


                <h1>Cadastro de propostas</h1>


                <Divider horizontal>Dados do cliente</Divider>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>
                        <Form.Input label="Razão Social" name="client.name" placeholder="Empresa LTDA"
                                    content={client.name} onChange={this.handleChange} required/>
                    </Form.Field>

                    <Form.Field>
                        <Form.Input label="Nome Santasia" name="client.name" placeholder="Empresa"
                                    content={client.commercialName} onChange={this.handleChange} required/>
                    </Form.Field>

                    <Form.Field>
                        <Form.Input label="CNPJ" name="client.document" placeholder="11.111.111/1111-11"
                                    content={client.document} onChange={this.handleChange} required/>
                    </Form.Field>


                    <Divider horizontal>Cursos</Divider>

                    <Form.Field>
                        <Search
                                minCharacters={2} loading={isLoading}
                                placeholder="FJ-11"
                                results={results}
                                value={value}
                                resultRenderer={this.resultRender}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleSearchCourse}
                        />
                    </Form.Field>


                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} className={form.courses}>
                                    {selectedCourses.map((option, index) => {

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
                                                            {text}

                                                            <a className={form.couse_item_close}
                                                               onClick={(e) => this.removeSelectedCourse(e, option)}>
                                                                <span/>
                                                            </a>

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

                    <Button type='submit' disabled={disableSubmmit}>Salvar</Button>

                </Form>
            </div>
        );
    }
}

export default PropostaForm;