import React, {useState, useCallback} from 'react';
import {Form, Field, FormSpy, useForm, useField, useFormState} from 'react-final-form';
import useToggle from './useToggle';
import {addToTracker, removeFromTracker} from './useTracker';

const myData = [
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'},
  {id: 4, name: 'd'},
];
window.myData = myData;



const InvitePopup = ({open, closePopup}) => {
  console.log('3.InvitePopup is render');
  return (open ?
    <div className="popup">
      <h1>Invite Popup Open</h1>
      <span onClick={closePopup}> [close] </span>
    </div>
    : null);
}

let version = 0;

const MyList = ({value, change, mutators}) => {
  console.log('2.My List is render');
  const data = value || [];
  const onClick = (e) => {
    const id = Number(e.target.dataset.id);
    const idx = data.findIndex((a) => a.id === id);
    if (idx > -1) {
      const item  = data[idx];
      const currentlyChecked = item.isCheck;
      if(currentlyChecked) {
        change(`rowData.${idx}`, {id: item.id, name: item.name});
        mutators.removeFromTracker(`tracker`, item);
      } else {
        change(`rowData.${idx}.isCheck`, true);
        mutators.addToTracker(`tracker`, item);
      }

    }
  };
  const list = data.map(({id, name, isCheck}, idx) => (
    <li key={idx} data-id={id} onClick={onClick}>{name} {isCheck ? '[X]' : ''}</li>
  ));

  return (<ul>{list}</ul>);

};

const MySmartForm = () => {
  const {mutators, change} = useForm();
  const {input: {value}} = useField('rowData', {value: true});
  const [invitePopupOpen, toggleInvitePopup] = useToggle(false);

  return <div>
    <MyList value={value} change={change} mutators={mutators}/>
    <InvitePopup open={invitePopupOpen} closePopup={toggleInvitePopup}/>
    <MyFooter toggleInvitePopup={toggleInvitePopup}/>
  </div>
};

const MyFooter = ({toggleInvitePopup}) => {
  console.log('4.MyFooter is render');
  const {reset, getState} = useForm();
  const {dirty} = getState();
  const resetClick = () => reset();

  return (<div className="footer-form">
    <button disabled={!dirty} onClick={resetClick}>Reset</button>
    <button disabled={!dirty} onClick={toggleInvitePopup}>Submit</button>
  </div>);
};

const Main = () => {
  console.log('1.Main is render');

  const onSubmit = (data) => {
    console.log('submit', data);
  };

  const formOptions = {
    initialValues: {rowData: myData, version: version++},
    tracker: undefined,
    onSubmit,
    mutators: {addToTracker, removeFromTracker},
    subscription: {dirty: true}
  };

  return (<div>
    <h1>Hello</h1>
    <Form {...formOptions}
          render={({form}) => {
            window.myForm = form;
            return (
              <section>
                <MySmartForm change={form.change}/>
              </section>
            );
          }}
    >
    </Form>
  </div>);
};

export default Main;