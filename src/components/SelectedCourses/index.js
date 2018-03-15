import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {CourseOptionDTO} from "../../domains";
import customStyle from './selectedCourses.css'

class SelectedCourses extends Component {
    static propTypes = {

        reorder: PropTypes.func,

        removeSelectedCourse: PropTypes.func,

        selectedCourses: PropTypes.arrayOf(PropTypes.instanceOf(CourseOptionDTO))
    };

    onDragEnd = (result) => {

        // Dropado fora da lista
        if (!result.destination) {
            return;
        }

        this.props.reorder(
            this.props.selectedCourses,
            result.source.index,
            result.destination.index
        );
    };




    render(){

        const {selectedCourses, removeSelectedCourse} = this.props;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div ref={provided.innerRef} className={customStyle.courses}>
                            {selectedCourses.map((option, index) => {

                                let {text, value} = option;

                                return (
                                    <Draggable draggableId={value} index={index} key={index}>
                                        {(provided) => (
                                            <div>
                                                <div className={customStyle.course_item}
                                                     ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                >
                                                    {text}

                                                    <a className={customStyle.couse_item_close}
                                                       onClick={(e) => removeSelectedCourse(e, option)}>
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
        );
    }
}

export default SelectedCourses