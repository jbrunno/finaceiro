import { hotjar } from 'react-hotjar';
import { HOTJAR_ID, HOTJAR_SNIPPET_VERSION } from './config';

if (HOTJAR_ID && HOTJAR_SNIPPET_VERSION) {
  hotjar.initialize(Number(HOTJAR_ID), Number(HOTJAR_SNIPPET_VERSION));
}
