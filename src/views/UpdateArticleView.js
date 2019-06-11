import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser';
import isEmpty from '../helpers/is_empty';
import CreateArticle from '../components/articles/CreateArticle';
import { getSingleArticle, updateArticle } from '../redux/actions/UpdateArticleAction';
import uploadImageCallBack from '../helpers/image_uploader';

class UpdateArticleView extends Component {
    state = {
      title: '',
      description: '',
      body: EditorState.createEmpty(),
      tagList: '',
      imageIsLoading: false,
      image: '',
    };

    componentDidMount() {
      if (this.props.match && this.props.match.params) {
        const { slug } = this.props.match.params;

        const { fetchSingleArticle, history } = this.props;
        fetchSingleArticle(slug, history);
      }
    }

    componentWillReceiveProps(nextProps) {
      try {
        if (nextProps.updateNewArticle.message.data) {
          const article = nextProps.updateNewArticle.message.data.data;
          const articleBody = article.body;
          const contentBlock = htmlToDraft(articleBody);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const body = EditorState.createWithContent(contentState);

          this.setState({
            title: article.title,
            description: article.description,
            body,
            tagList: article.tag_list.join(),
            image: article.image,
            slug: article.slug,
          });
        }
      } catch (e) {
      }
    }

    /*
     * onChange:
     * gets the values from the inputs
     * and adds them to the state
     */
    onChange = event => {
      const {
        target: { name, value },
      } = event;
      this.setState({ [name]: value });
    };

    /*
     * onImageClick:
     * gets if image is available
     * uploads image
     */
    onImageClick = event => {
      event.preventDefault();
      const image = event.target.files[0];

      if (image) {
        this.setState({
          imageIsLoading: true,
        });
        uploadImageCallBack(image).then(response => {
          this.setState({
            image: response.data.url,
            imageIsLoading: false,
          });
        });
      }
    };

    /*
     * onEditorStateChange:
     * gets the current state of the editor
     */
    onEditorStateChange = (body) => {
      this.setState({
        body,
      });
    };

    /*
    * onSubmit:
    * checks whether passwords match
    * if the passwords match
    * submits form data
    */
    onSubmit = event => {
      event.preventDefault();
      const { tagList } = this.state;
      const noSpaceString = tagList.replace(/\s/g, '');
      let tagsArray = [];
      if (!isEmpty(noSpaceString)) {
        tagsArray = noSpaceString.split(',');
      }

      const { putArticle, history } = this.props;
      const {
        title, description, body, image, slug,
      } = this.state;
      const bdy = draftToHtml(convertToRaw(body.getCurrentContent()));

      if (parse(bdy)[0].props.children !== null) {
        putArticle({
          image,
          title,
          description,
          body: draftToHtml(convertToRaw(body.getCurrentContent())),
          tag_list: tagsArray,
        }, slug, history);
      }
    };

    render() {
      const {
        title, body, description, tagList, imageIsLoading, image,
      } = this.state;
      const { updateNewArticle } = this.props;
      return (
        <CreateArticle
          onChange={this.onChange}
          state={this.state}
          onEditorStateChange={this.onEditorStateChange}
          onSubmit={this.onSubmit}
          isLoading={updateNewArticle.isLoading}
          uploadImageCallBack={uploadImageCallBack}
          image={image}
          onImageClick={this.onImageClick}
          imageIsLoading={imageIsLoading}
          title={title}
          body={body}
          description={description}
          tagList={tagList}
        />
      );
    }
}

UpdateArticleView.propTypes = {
  fetchSingleArticle: PropTypes.func,
  updateNewArticle: PropTypes.shape({}),
  putArticle: PropTypes.func,
  history: PropTypes.shape({}),
  slug: PropTypes.string,
};

UpdateArticleView.defaultProps = {
  putArticle: PropTypes.func,
  fetchSingleArticle: PropTypes.func,
  updateNewArticle: PropTypes.shape({}),
  history: PropTypes.shape({}),
  slug: PropTypes.string,
};

const mapDispatchToProps = () => ({
  fetchSingleArticle: getSingleArticle,
  putArticle: updateArticle,
});

const mapStateToProps = state => ({
  updateNewArticle: state.updateArticle,
  error: state.updateArticle.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(UpdateArticleView);
