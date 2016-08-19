import { FETCH_TABS, FETCH_TAB, FETCH_ARTIST } from "../actions/index";
import { parseString } from 'xml2js';

const INITIAL_STATE = { all: null, selected: null, artist: null };

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_TABS:
      var jsonResult;
      parseString(action.payload.data, (err, result) => jsonResult = result.results.result);
      return { ...state, all: jsonResult };

    case FETCH_TAB:
      return { ...state, selected: action.payload.data };

    case FETCH_ARTIST:
      return { ...state, artist: action.payload.data.artists };

    default:
      return state;
  }
}
