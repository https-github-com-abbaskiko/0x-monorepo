import { constants as docConstants, DocsInfo, DocsInfoConfig, SupportedDocJson } from '@0xproject/react-docs';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DocPage as DocPageComponent, DocPageProps } from 'ts/pages/documentation/doc_page';
import { Dispatcher } from 'ts/redux/dispatcher';
import { State } from 'ts/redux/reducer';
import { DocPackages } from 'ts/types';
import { Translate } from 'ts/utils/translate';

/* tslint:disable:no-var-requires */
const IntroMarkdownV1 = require('md/docs/sol-compiler/introduction');
const InstallationMarkdownV1 = require('md/docs/sol-compiler/installation');
const UsageMarkdown = require('md/docs/sol-compiler/usage');
/* tslint:enable:no-var-requires */

const markdownSections = {
    introduction: 'introduction',
    installation: 'installation',
    usage: 'usage',
    compiler: 'compiler',
    types: docConstants.TYPES_SECTION_NAME,
};

const docsInfoConfig: DocsInfoConfig = {
    id: DocPackages.SolCompiler,
    type: SupportedDocJson.TypeDoc,
    displayName: 'Solidity Compiler',
    packageUrl: 'https://github.com/0xProject/0x-monorepo',
    markdownMenu: {
        introduction: [markdownSections.introduction],
        install: [markdownSections.installation],
        usage: [markdownSections.usage],
        compiler: [markdownSections.compiler],
        types: [markdownSections.types],
    },
    sectionNameToMarkdownByVersion: {
        '0.0.1': {
            [markdownSections.introduction]: IntroMarkdownV1,
            [markdownSections.installation]: InstallationMarkdownV1,
            [markdownSections.usage]: UsageMarkdown,
        },
    },
    markdownSections: markdownSections,
    typeConfigs: {
        typeNameToExternalLink: {},
        typeNameToPrefix: {},
    },
};
const docsInfo = new DocsInfo(docsInfoConfig);

interface ConnectedState {
    docsVersion: string;
    availableDocVersions: string[];
    docsInfo: DocsInfo;
    translate: Translate;
}

interface ConnectedDispatch {
    dispatcher: Dispatcher;
}

const mapStateToProps = (state: State, _ownProps: DocPageProps): ConnectedState => ({
    docsVersion: state.docsVersion,
    availableDocVersions: state.availableDocVersions,
    translate: state.translate,
    docsInfo,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): ConnectedDispatch => ({
    dispatcher: new Dispatcher(dispatch),
});

export const Documentation: React.ComponentClass<DocPageProps> = connect(mapStateToProps, mapDispatchToProps)(
    DocPageComponent,
);
