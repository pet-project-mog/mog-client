import React, {Component} from 'react';
import {Form, Button, Divider, Search} from 'semantic-ui-react'
import customStyle from './proposta.css'
import {Api} from '../../services'
import SelectedCourses from '../SelectedCourses'
import {Customer} from '../../domains';
import Responsible from '../../domains/models/Responsible';
import Unit from '../../domains/models/Unit';

class Offer extends Component {

    defaultOptions = [];
    state = {
        commercialName: '',
        responsibleName: '',
        companyUnit: '',
        selectedCourses: [],
    };


    handleChange = ({ target }) => {
        const formElements = target.closest('form').elements
        const name = target.getAttribute('name')
        const value = formElements[name].value

        this.setState({[name]: value})
    };

    handleSubmit = () => {

        const {selectedCourses, commercialName, responsibleName, companyUnit} = this.state;

        Api.downloadOffer(new Customer(commercialName), new Responsible(responsibleName), new Unit(companyUnit), selectedCourses);

    };

    resultRender = (option) => {
        const {course} = option;

        return <div key={course.code} className={course.platform === 'ONLINE'? customStyle.online_result: customStyle.classroom_result}>{course.name}</div>
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

    reorder = (list, startIndex, endIndex) => {

        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        this.setState({selectedCourses: result});
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

    removeSelectedCourse = (event, course) => {
        let {selectedCourses} = this.state;

        const index = selectedCourses.indexOf(course);

        selectedCourses.splice(index, 1);

        this.setState({selectedCourses});

    };

    componentWillMount() {
        Api.fetchCourses()
            .then( (options) => { this.defaultOptions = options } );

        this.resetSearch();
    };


    render() {

        const {commercialName, responsibleName, companyUnit, isLoading, results, value, selectedCourses} = this.state;
        let disableSubmmit = selectedCourses.length === 0 || commercialName === '' || responsibleName === '' || companyUnit === '';

        return (
            <div className={customStyle.content}>

                <h1>Cadastro de propostas</h1>
                { JSON.stringify(this.state) }
                <Divider horizontal>Dados do cliente</Divider>
                <Form onSubmit={this.handleSubmit}>


                    <Form.Field>
                        <Form.Input label="Empresa" name="commercialName" placeholder="Caixa Econômica Federal"
                                    content={commercialName} onChange={this.handleChange} required/>
                    </Form.Field>

                    <Form.Field>
                        <Form.Input label="Responsável Caelum" name="responsibleName" placeholder="Bianca Cavalcante"
                                    content={responsibleName} onChange={this.handleChange} required/>
                    </Form.Field>

                    <Form.Field>
                            <label className="unitLabel" htmlFor="companyUnit">Unidade</label>
                            <select name="companyUnit" content={companyUnit} onChange={this.handleChange} required>
                                <option value="" hidden>-- Selecione uma unidade --</option>
                                <option value="SP">São Paulo</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="BSB">Brasília</option>
                            </select>
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

                    <SelectedCourses reorder={this.reorder} selectedCourses={selectedCourses} removeSelectedCourse={this.removeSelectedCourse}/>

                    <Button type='submit' disabled={disableSubmmit}>Gerar Proposta</Button>

                </Form>
            </div>
        );
    }
}

export default Offer;