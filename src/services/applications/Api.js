import {Course, CourseOptionDTO} from "../../domains";


export default class Api {

    static fetchCourses(){
        return fetch("http://localhost:8080/courses")
                    .then( response => response.json())
                    .then( (values) => values.map( (json) => new Course(json) ) )
                    .then( (courses) => courses.map( (course) => new CourseOptionDTO(course) ) );
    }


}