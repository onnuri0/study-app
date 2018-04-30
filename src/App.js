import React, { Component } from 'react';
import UserList from "./UserList";
import {
    Segment, Grid, Form, Button, Dimmer, Loader,
} from 'semantic-ui-react';

const APIURL = "http://localhost:8080/api";

const options = [
    { key: 'm', text: '회원', value: '회원' },
    { key: 'f', text: '스탭', value: '스탭' },
]

class App extends Component {

    state = {
        vo : {
            buId: '',
            buName: '',
            buRole: ''
        },
        message : '',
        userlist : [],
        checkid : '',
        active : false
    };

    componentDidMount() {
        this._asyncLoad();
    }

    readAct = () => {
        this.setState({
           active : true
        });
        this._asyncLoad();
    }

    _asyncLoad = async() => {
        try{
           await Promise([
                fetch(APIURL+'/user')
                    .then((res)=>{
                        return res.json();
                    })
                    .then( (data)=> {
                        console.log("[data] ", data);
                        this.setState({
                           userlist : data
                        });
                    })
                    .catch( (e) => {
                        console.log("[error] ", e);
                    })
            ]);
        }catch (e){
            console.warn("[Problem occured ] ", e);
            this.setState({
               message : JSON.stringify(e)
            });
        }finally {
            this.loadOff();
        }
    }

    loadOff = async () => {
        await setTimeout(()=>{
            this.setState({
                active: false
            });
        },300);

    }

    saveAct = () => {
        this.setState({
            active : true
        });
       // console.log("[###] ", this.state.vo);
      this._asyncSave();
    };

    _asyncSave = async() => {

        try{
             Promise([
               await fetch(APIURL+'/user',{
                   method : 'post',
                   headers: {
                       'content-type': 'application/json'
                   },
                   body : JSON.stringify(this.state.vo)
               })
                   .then((res)=>res.json())
                   .then( (data)=>{

                   })
                   .catch((e)=>{
                        //console.log("[save error] ", e);
                   })
            ]);
        }catch (e){
            console.warn("[Problem occured ] ", e);
        }finally {
             this.setState({
                vo : {
                    buName :''
                }
             });
             this._asyncLoad();
        }
    }

    onRowSelection = (data) => {
        //console.log("[data] ", data);
        this.setState({
            vo : {...this.state.vo,
                buId: data.buId,
                buName: data.buName,
            },
            checkid: data.buId
        })
    }

    nameChange = (e)=>{
        this.setState({
            vo : {...this.state.vo,
                buName : e.target.value
            }
        })
    }

    roleChange = (e, data) =>{
        //console.log("[>>] ", data);
        this.setState({
            vo : {...this.state.vo,
                buRole : data.value
            }
        })
    }

    deleteAct = () => {
        this.setState({
            active : true
        });
        console.log("[del vo] ", this.state.checkid);
        this._asyncDelete();
    }

    _asyncDelete = async() => {
        try{
            Promise([
                await fetch(APIURL+'/user/'+this.state.checkid,{
                    method : 'delete',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then((res)=>res.json())
                    .then( (data)=>{

                    })
                    .catch((e)=>{
                        //console.log("[save error] ", e);
                    })
            ]);
        }catch (e){
            console.warn("[Problem occured ] ", e);
        }finally {
            this._asyncLoad();
        }
    }


  render() {
    return (
      <Segment>



          <Grid divided>
              <Grid.Row>
                  <Grid.Column width={6}>
                      <Form>
                          <Form.Field>
                              <label>이름</label>
                              <input placeholder='이름을 입력하세요' value={this.state.vo.buName}
                                onChange={this.nameChange}
                              />
                          </Form.Field>
                          <Form.Field>
                              <Form.Select fluid label='역할' options={options}
                                           placeholder='역할 선택'
                                           onChange={this.roleChange}
                              />
                          </Form.Field>
                          <Button color="green" onClick={this.readAct}>조회</Button>
                          <Button color="red" onClick={this.saveAct}>저장</Button>
                          <Button color="orange" onClick={this.deleteAct}>삭제</Button>
                      </Form>
                  </Grid.Column>

                  <Grid.Column width={10}>
                      <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                          <Dimmer active={this.state.active} inverted>
                              <Loader>Loading</Loader>
                          </Dimmer>
                      <UserList list={this.state.userlist} onRowSelection={this.onRowSelection}
                                checkid={this.state.checkid}/>
                      </Dimmer.Dimmable>
                  </Grid.Column>


              </Grid.Row>
          </Grid>


      </Segment>
    );
  }
}

export default App;
