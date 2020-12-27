import React, {useState, useCallback} from 'react';
import {Form, Field, FormSpy} from 'react-final-form';

const myData = [
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'},
  {id: 4, name: 'd'},
];
window.myData = myData;

const useToggle = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(value => {
      setState(currentState => value === true || value === false ? value : !currentState);
    },
    [setState]);
  return [state, toggle];
};

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

const MyList = ({value, change}) => {
  console.log('2.My List is render');
  const data = value || [];
  const onClick = (e) => {
    const id = Number(e.target.dataset.id);
    const idx = data.findIndex((a) => a.id === id);
    if (idx > -1) {
      change(`rowData.${idx}.isCheck`, !data[idx].isCheck);
    }
  };
  const list = data.map(({id, name, isCheck}, idx) => (
    <li key={idx} data-id={id} onClick={onClick}>{name} {isCheck ? '[X]' : ''}</li>
  ));

  return (<ul>{list}</ul>);

};

const MySmartForm = ({formOptions}) => {

};

const Main = () => {
  console.log('1.Main is render');
  const [invitePopupOpen, toggleInvitePopup] = useToggle(false);
  const onSubmit = (data) => {
    console.log('submit', data);
    toggleInvitePopup();
  };

  const formOptions = {
    initialValues: {rowData: myData, version: version++},
    onSubmit,
    subscription: {dirty: true}
  };

  return (<div>
    <h1>Hello</h1>
    {/*<InvitePopup
            open={invitePopupOpen}
            closePopup={toggleInvitePopup}
        />
        <button onClick={toggleInvitePopup}>Invite Popup</button>*/}
    <Form {...formOptions}
          render={({form}) => {
            window.myForm = form;
            return (
              <section>
                <Field name="rowData" subscription={{value: true}}>
                  {({input}) => {
                    return <MyList value={input.value} change={form.change}/>;
                  }}

                </Field>

                <InvitePopup
                  open={invitePopupOpen}
                  closePopup={toggleInvitePopup}/>

                <FormSpy subscription={{dirty: true}}>
                  {props => (
                    <div className="footer-form">
                      <button onClick={form.reset}>Reset</button>
                      <button disabled={!props.dirty} onClick={toggleInvitePopup}>Submit</button>
                    </div>
                  )}
                </FormSpy>
              </section>
            );
          }}
    >
    </Form>
  </div>);
};

export default Main;