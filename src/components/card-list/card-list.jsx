import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// Container
import {compose} from 'redux';
import {connect} from 'react-redux';
import { fetchArticles } from '../../actions/articles';
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
    }
}));

function CardList({
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
                    component="p"
                    className={classes.paperParagraph}
                    dangerouslySetInnerHTML={{__html: text ? text : '...'}}
                />
                {showSecondaryText ? (
                    <Fragment>
                        <Divider className={classes.divider} />
                        <Typography
                            component="p"
                            dangerouslySetInnerHTML={{__html: secondaryText ? secondaryText : '...'}}
                            color="textSecondary"
                        />
                    </Fragment>
                ) : null}
            </Paper>
        )
    }

    return (
        <div>
            {list.map(({ orderNumber, text, secondaryText, sectionTitle, sectionId }) => {
                return (
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
                )
            })}
        </div>
    )
}

class CardListContainer extends React.Component {

    componentDidMount() {
        const { languageCode = 'en-US' } = this.props;
        console.log('languageCode1=', languageCode);
        this.props.fetchArticles(languageCode);
    }

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
            languageCode
        } = this.props;

        if (articlesError) {
            return <ErrorIndicator error={articlesError} />
        }

        if (!isLoadedArticles) {
            return <CircularProgress />
        }

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
            <CardList
                languageCode={languageCode}
                list={list}
                showSecondaryText={isEnableTransliteration}
                {...this.props}
            />
        );
    }

}

const mapStateToProps = ({ articles, titles, languageCode }) => ({
    articles,
    titles,
    languageCode
});

const mapDispatchToProps = (dispatch) => ({
    fetchArticles: fetchArticles(dispatch)
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CardListContainer)
