import React from 'react';
import PropTypes from 'prop-types';

import {
    Segment, Table, Header, Checkbox
} from 'semantic-ui-react';

const UserList = ( {list, onRowSelection, checkid} ) => {

    return (
        <div>
            <Header>사용자 정보</Header>
            <Table color='green'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>No</Table.HeaderCell>
                        <Table.HeaderCell>이름</Table.HeaderCell>
                        <Table.HeaderCell>역할</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        Array.isArray(list) ?
                            list.map((data, index) => {
                                return <Table.Row key={index} positive={index%2===0}
                                                  >
                                    <Table.Cell>
                                        <Checkbox checked={checkid!==undefined?checkid.indexOf(data.buId)>-1:false}
                                                  onChange={ () => onRowSelection(data)}/>
                                    </Table.Cell>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{data.buName}</Table.Cell>
                                    <Table.Cell>{data.buRole}</Table.Cell>
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