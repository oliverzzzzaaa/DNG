import { connect } from 'react-redux';
import WaitingRoom from './waiting';

const mSP = state => ({
    users: state.room.players
});

const mDP = dispatch => ({
    ready: () => console.log(ready)
});

export default connect(mSP, mDP)(WaitingRoom)