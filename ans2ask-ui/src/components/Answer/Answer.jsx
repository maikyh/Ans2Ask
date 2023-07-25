import React from 'react';
import "./Answer.css";

const url = `http://localhost:3001`;

export default function Answer({images, answer,handleGiveThanks,user,question,thankedAnswerExist}) {

    const image = images.filter(image => image.public_id === answer.user.email);
    console.log(image);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center custom-container-question-details bg-light px-4 pt-3 pb-2">
                <div style={{border: '0.5px solid gray' }} className="custom-container-question-details-answer mt-0 p-2 px-3 position-relative">
                    <div className="row mr-0">
                        <div className='col-auto'>
                            {image && image[0] && image[0].url &&
                                <img
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "0px",
                                    borderRadius: "50%",
                                    marginBottom: "3px"
                                }}
                                className='preview-image'
                                src={image[0].url}
                                alt="profilePicture"
                                />
                            }
                        </div>
                        <div className="col" style={{padding:"0px"}}>
                            <h6 className="mt-1"> {answer.user.username} </h6>
                        </div>
                    </div>
                    <div className="row border border-dark mb-1 mx-0"></div>
                    <div className="">
                        <p className="mb-1"> {answer.body} </p>
                    </div>
                    {
                        thankedAnswerExist === false && question.userId === user.id &&
                        <div class="position-absolute top-0 end-0 p-1 px-3 text-danger fw-bold">
                            <button onClick={() => handleGiveThanks(answer.id,answer.body,answer.user)} className="btn btn-danger py-0 px-1">
                                Give Thanks
                            </button>
                        </div>
                    }
                    {
                        answer.thanks === true &&
                        <div class="position-absolute top-0 end-0 p-1 px-3 text-danger fw-bold">
                            <p className="text-white bg-danger py-0 px-1">
                                Thanked Answer
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
  }