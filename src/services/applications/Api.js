import {Course, CourseOptionDTO} from "../../domains";


export default class Api {

    static fetchCourses(){
        return fetch("http://localhost:8080/courses")
                    .then( response => response.json())
                    .then( (values) => values.map( (json) => new Course(json) ) )
                    .then( (courses) => courses.map( (course) => new CourseOptionDTO(course) ) );
    }

    static downloadOffer(customer, coursesDTO){

        const courses = coursesDTO.map(dto => dto.toEntity());

        const payload = {   ...customer, courses };

        const headers = {'Content-Type': 'application/json'};
        const request = {method: 'post', body: JSON.stringify(payload), headers }

        fetch("http://localhost:8080/offers", request)
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(url => {
                window.open(url, '_blank');
                URL.revokeObjectURL(url);
            });

    }


}