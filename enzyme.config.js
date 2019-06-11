import { configure } from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill';
import MutationObserver from 'mutation-observer';

global.MutationObserver = MutationObserver;
document.getSelection = jest.fn();

configure({ adapter: new Adapter() });
