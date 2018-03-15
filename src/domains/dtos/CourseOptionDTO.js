

export default class CourseOptionDTO {

    constructor(course){
        this.course = course;
    }


    get value(){
        return this.course.code;
    }

    get text(){
        return this.course.name;
    }

    get childKey(){
        return this.course.code;
    }
}