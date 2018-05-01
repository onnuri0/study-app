import React, { Component } from 'react';
import UserList from "./BoardList";
import {
    Segment, Grid, Form, Button, Dimmer, Loader,
} from 'semantic-ui-react';

const APIURL = "http://localhost:8080/api";
let currentDate = new Date();
let currentDay = currentDate.toISOString();
console.log('currentDay::' + currentDay);
let currentDay2 = currentDate.toDateString();
console.log('currentDay2::' + currentDay2);
let currentDay3 = currentDate.toLocaleDateString();
console.log('currentDay2::' + currentDay3);
let currentDay4 = currentDate.toTimeString();
console.log('currentDay2::' + currentDay4);
let currentDay5 = currentDate.toLocaleString();
console.log('currentDay2::' + currentDay5);
const options = [
    { key: 't', text: '제목', value: '제목' },
    { key: 'c', text: '내용', value: '내용' },
]

class App2 extends Component {

    state = {
        vo : {
            bdId: 'ex01',
            bdTitle: '',
            bdContent: '',
            bdWriteDate: currentDay,        
            bdWriterId: {
                "buId": "USE_201804261702195",
                "buName": "string",
                "buRole": "string"
              }
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
                fetch(APIURL+'/board')
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
            console.log('strtingify::' + JSON.stringify(this.state.vo));
             Promise([
               await fetch(APIURL+'/board',{
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
                    bdTitle :''
                    , bdContent : ''
                }
             });
             this._asyncLoad();
        }
    }

    onRowSelection = (data) => {
        console.log("[data] ", data);
        this.setState({
            vo : {...this.state.vo,
                bdId: data.bdId,
                bdTitle: data.bdTitle,
                bdContent: data.bdContent,
                bdWriteDate: data.bdWriteDate,
            },
            checkid: data.bdId
        })
    }

    nameChange = (e)=>{
        this.setState({
            vo : {...this.state.vo,
                bdTitle : e.target.value
            }
        })
    }
 
    contentChange = (e)=>{
        this.setState({
            vo : {...this.state.vo,
                bdContent : e.target.value
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
        console.log("[del vo] ", this.state);
        this._asyncDelete();
    }

    _asyncDelete = async() => {
        try{
            Promise([
                await fetch(APIURL+'/board/'+this.state.checkid,{
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
                                <input placeholder='이름을 입력하세요' value={this.state.vo.bdTitle}
                                  onChange={this.nameChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>내용</label>
                                <input placeholder='내용을 입력하세요' value={this.state.vo.bdContent}
                                  onChange={this.contentChange}
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

export default App2;
