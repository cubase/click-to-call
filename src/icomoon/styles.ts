import { injectGlobal } from 'emotion'

import icomoonTtf from '../icomoon/fonts/icomoon.ttf'
import icomoonWoff from '../icomoon/fonts/icomoon.woff'
import icomoonSvg from '../icomoon/fonts/icomoon.svg'

injectGlobal`
    @font-face {
        font-family: 'icomoon';
        src:
        url('${icomoonTtf}') format('truetype'),
        url('${icomoonWoff}') format('woff'),
        url('${icomoonSvg}') format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }

    .icon {
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'icomoon' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Enable Ligatures ================ */
        letter-spacing: 0;
        -webkit-font-feature-settings: "liga";
        -moz-font-feature-settings: "liga=1";
        -moz-font-feature-settings: "liga";
        -ms-font-feature-settings: "liga" 1;
        font-feature-settings: "liga";
        -webkit-font-variant-ligatures: discretionary-ligatures;
        font-variant-ligatures: discretionary-ligatures;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconphone-call:before {
        content: "\e900";
    }
    .iconphone-missed:before {
        content: "\e901";
    }
`
