import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import parse from 'html-react-parser';
import CreateArticle from '../components/articles/CreateArticle';
import isEmpty from '../helpers/is_empty';
import { createArticle } from '../redux/actions/CreateArticleAction';
import uploadImageCallBack from '../helpers/image_uploader';

class CreateArticleView extends Component {
    state = {
      title: '',
      description: '',
      body: EditorState.createEmpty(),
      tagList: '',
      imageIsLoading: false,
      image: '',
    };

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

      const { postArticle, history } = this.props;
      const {
        title, description, body, image,
      } = this.state;
      const bdy = draftToHtml(convertToRaw(body.getCurrentContent()));

      if (parse(bdy)[0].props.children !== null) {
        postArticle({
          image,
          title,
          description,
          body: bdy,
          tag_list: tagsArray,
        }, history);
      }
    };

    render() {
      const {
        image, imageIsLoading, body, description, title, tagList,
      } = this.state;
      const { createNewArticle } = this.props;
      return (
        <CreateArticle
          onChange={this.onChange}
          state={this.state}
          onEditorStateChange={this.onEditorStateChange}
          onSubmit={this.onSubmit}
          isLoading={createNewArticle.isLoading}
          uploadImageCallBack={uploadImageCallBack}
          image={image}
          onImageClick={this.onImageClick}
          imageIsLoading={imageIsLoading}
          body={body}
          description={description}
          title={title}
          tagList={tagList}
        />
      );
    }
}

CreateArticleView.propTypes = {
  postArticle: PropTypes.func,
  history: PropTypes.shape({}),
  createNewArticle: PropTypes.shape({}),
};

CreateArticleView.defaultProps = {
  postArticle: PropTypes.func,
  history: PropTypes.shape({}),
  createNewArticle: PropTypes.shape({}),
};

const mapDispatchToProps = () => ({
  postArticle: createArticle,
});

const mapStateToProps = state => ({
  createNewArticle: state.createArticle,
  error: state.createArticle.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(CreateArticleView);
