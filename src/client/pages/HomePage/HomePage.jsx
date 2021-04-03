import React, { useEffect } from 'react';
import { connect } from "react-redux";

import MuiContainer from '@material-ui/core/Container';
import MuiGrid from '@material-ui/core/Grid';
import MuiPaper from '@material-ui/core/Paper';

const HomePage = (props) => {

    return (
        <MuiContainer maxWidth="md">
            <MuiGrid container spacing={3}>
                <MuiGrid item xs={12}>
                    <MuiPaper elevation={3} style={{ padding: '25px' }}>
                        {props.user.name}
                    </MuiPaper>
                </MuiGrid>
            </MuiGrid>
        </MuiContainer>
    );
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(HomePage);

