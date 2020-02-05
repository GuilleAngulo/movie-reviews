import React from 'react';

import Button from './components/Button';
import Suggest from './components/Suggest';
import FormInput  from './components/FormInput';
import Form  from './components/Form';
import Rating  from './components/Rating';
import Actions from './components/Actions';
import Dialog from './components/Dialog';

function Discover() {
    return (
      <>
        <div style={{padding: '20px'}}>
                <h1>Component discoverer</h1>

                {/* 
                <h2>Buttons</h2>
                <div> Button with onClick: <Button onClick={() => alert('Ouch!')}>Click Me</Button></div>
                <div> A Link: <Button href="http://reactjs.com" >Follow Me</Button></div>
                <div> Custom class name: <Button className="custom" >I do nothing</Button></div>

                <h2>Suggest</h2>
                <div><Suggest options={["eenie", "miney", "mo"]} /></div>
                
                <h2>Rating</h2>
                <div>No initial value: <Rating /></div>
                <div>Initial value:4 <Rating defaultValue={4}/></div>
                <div>This one goes to 11: <Rating max={11}/></div>
                <div>Read-only: <Rating readonly={true} defaultValue={3} /></div>
                
               
                <h2>Form inputs</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Vanilla input</td>
                            <td><FormInput /></td>
                        </tr>
                        <tr>
                            <td>Prefilled</td>
                            <td><FormInput defaultValue="it´s like a default" /></td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td><FormInput type="year" /></td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td><FormInput type="rating" defaultValue={4} /></td>
                        </tr>
                        <tr>
                            <td>Suggest</td>
                            <td>
                                <FormInput 
                                type="suggest" 
                                options={['red', 'green', 'blue']}
                                defaultValue="green" 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Vanilla Textarea</td>
                            <td><FormInput type="text" /></td>
                        </tr>
                    </tbody>
                </table>
                

                <Form 
                fields={[
                    {label: 'Rating', type:"rating", id: "rateme"},
                    {label: 'Greetings', id: "freetext"},
                ]}
                initialData={{rateme: 4, freetext: 'Hello'}} />
                

                <h2>Actions</h2>
                <div><Actions onAction={type => alert(type)} /></div>

                */}

                <h2>Dialogs</h2>
                <Dialog
                    header="Out-of-the-box example"
                    onAction={type => alert(type)}>
                        Hello, dialog!
                </Dialog>
                <Dialog
                    header="No cancel, custom button"
                    hasCancel={false}
                    confirmLabel="Whatever"
                    onAction={type => alert(type)}>
                        Anything goes here, see:
                        <Button >A button</Button>
                </Dialog>

            </div>
        </>
    );
}

export default Discover;