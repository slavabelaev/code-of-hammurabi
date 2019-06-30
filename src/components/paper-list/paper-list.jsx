import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
// Container
import {compose} from 'redux';
import {connect} from 'react-redux';
import { fetchArticles } from '../../actions/articles';
import { fetchComments } from '../../actions/comments';
import ErrorIndicator from '../error-indicator';
import { toHashTitle } from '../../utils';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 16,
        marginBottom: 16
    },
    paperTitle: {
        display: 'inline-block',
        margin: 0,
        marginRight: 8,
        lineHeight: 1
    },
    sectionTitle: {
        marginTop: 32,
        marginBottom: 16
    },
    paperParagraph: {
        display: 'inline'
    },
    divider: {
        marginTop: 16,
        marginBottom: 16
    },
    fakeTitle: {
        height: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        marginBottom: 16,
        marginTop: 32
    },
    fakeContent: {
        height: 100,
        backgroundColor: '#f1f1f1',
        borderRadius: 4,
        marginBottom: 16
    },
}));

function PaperList({
    isLoaded,
    list = [],
    showSecondaryText
}) {
    const classes = useStyles();

    function renderPaper(orderNumber, text, secondaryText) {
        return (
            <Paper component="section" className={classes.paper} id={orderNumber}>
                {(orderNumber >= 1 && orderNumber <= 282) ? (
                    <Typography
                        component="h3"
                        className={classes.paperTitle}
                    >
                        {orderNumber}.
                    </Typography>
                ) : null}
                <Typography
                    component="div"
                    className={classes.paperParagraph}
                    dangerouslySetInnerHTML={{__html: text ? text : '...'}}
                />
                {showSecondaryText ? (
                    <Fragment>
                        <Divider className={classes.divider} />
                        <Typography
                            component="div"
                            dangerouslySetInnerHTML={{__html: secondaryText ? secondaryText : '...'}}
                            color="textSecondary"
                        />
                    </Fragment>
                ) : null}
            </Paper>
        )
    }

    const fakeContent = (
        <div>
            {Array(20).fill(null).map((item, index) => {
                const width = Math.floor(Math.random() * 40 + 60) + '%';
                return (
                    <div key={'fakeItem' + index}>
                        <div className={classes.fakeTitle} style={{width}} />
                        <div className={classes.fakeContent} />
                    </div>
                )
            })}
        </div>
    );

    return isLoaded ? (
        <div>
            {list.map(({ orderNumber, text, secondaryText, sectionTitle, sectionId }) => {
                return (orderNumber !== undefined) ? (
                    <Fragment key={orderNumber + sectionTitle}>
                        {sectionTitle ? (
                            <Typography
                                variant="h5"
                                component="h2"
                                className={classes.sectionTitle}
                                id={sectionId}
                            >
                                {sectionTitle}
                            </Typography>
                        ) : null}
                        {renderPaper(orderNumber, text, secondaryText)}
                    </Fragment>
                ) : null;
            })}
        </div>
    ) : fakeContent;
}

const styles = {
    commentDialog: {
        padding: 16
    }
};

class PaperListContainer extends React.Component {

    state = {
        isOpenDialog: false,
        comment: null
    };

    componentDidMount() {
        const { languageCode = 'en', fetchArticles, fetchComments } = this.props;
        fetchArticles(languageCode);
        fetchComments(languageCode);

        document.addEventListener('click', ({ target }) => {
            if (target['tagName'] === 'SUP'){
                const commentId = target.getAttribute('comment-id');
                this.toggleCommentDialog(commentId);
            }
        });
    }

    toggleCommentDialog = commentId => {
        const { comments: {
                serviceData: comments
            }
        } = this.props;

        this.setState(state => ({
            isOpenDialog: !state.isOpenDialog,
            comment: comments[commentId]
        }));
    };

    getSectionTitle(articleTitle) {
        const {
            titles: {
                serviceData: titles
            }
        } = this.props;
        const sectionTitleItem = titles.find(item => item.from === articleTitle);
        const sectionTitle = sectionTitleItem && sectionTitleItem.title;

        return sectionTitle || '';
    }

    render() {
        const {
            articles: {
                isLoaded: isLoadedArticles,
                error: articlesError,
                serviceData: articles,
                isEnableTransliteration
            },
            languageCode,
            classes
        } = this.props;
        const { isOpenDialog, comment } = this.state;

        if (articlesError) {
            return <ErrorIndicator error={articlesError} />
        }

        // if (!isLoadedArticles) {
        //     return <CircularProgress />
        // }

        const list = (articles).map(({ orderNumber, text, transliterationText }) => {
            const sectionTitle = this.getSectionTitle(orderNumber);
            const sectionId = toHashTitle(sectionTitle);
            return ({
                orderNumber,
                text,
                secondaryText: transliterationText,
                sectionTitle,
                sectionId
            })
        });

        return (
            <div>
                <Dialog
                    open={isOpenDialog}
                    onClose={this.toggleCommentDialog}
                >
                    {comment ? (
                        <div className={classes.commentDialog}>
                            {comment}
                        </div>
                    ) : <div />}
                </Dialog>
                <PaperList
                    isLoaded={isLoadedArticles}
                    languageCode={languageCode}
                    list={list}
                    showSecondaryText={isEnableTransliteration}
                    {...this.props}
                />
            </div>
        );
    }

}

const mapStateToProps = ({ articles, titles, comments, languageCode }) => ({
    articles,
    titles,
    comments,
    languageCode
});

const mapDispatchToProps = (dispatch) => ({
    fetchArticles: fetchArticles(dispatch),
    fetchComments: fetchComments(dispatch)
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PaperListContainer)
