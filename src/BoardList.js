import React from 'react';
import PropTypes from 'prop-types';

import {
    Segment, Table, Header, Checkbox
} from 'semantic-ui-react';

import moment from 'moment';

const UserList = ( {list, onRowSelection, checkid} ) => {

    return (
        <div>
            <Header>사용자 정보</Header>
            <Table color='green'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>No</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Content</Table.HeaderCell>
                        <Table.HeaderCell>등록일</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        Array.isArray(list) ?
                            list.map((data, index) => {
                                let time = moment(data.bdWriteDate).format("YYYY-MM-DD hh:mm:ss")
                                return <Table.Row key={index} positive={index%2===0}
                                                  >
                                    <Table.Cell>
                                        <Checkbox checked={checkid!==undefined?checkid.indexOf(data.buId)>-1:false}
                                                  onChange={ () => onRowSelection(data)}/>
                                    </Table.Cell>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{data.bdTitle}</Table.Cell>
                                    <Table.Cell>{data.bdContent}</Table.Cell>
                                    <Table.Cell>{time}</Table.Cell>
                                </Table.Row>
                            })
                            :
                            null
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

UserList.propTypes = {
    list : PropTypes.array.isRequired,
    onRowSelection : PropTypes.func.isRequired,
    checkid : PropTypes.string
};

UserList.defaultProps = {

}

export default UserList;