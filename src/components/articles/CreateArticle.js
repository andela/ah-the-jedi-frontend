import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import '../../assets/styles/createArticle.scss';
import { Form, Button, Spinner } from 'react-bootstrap';

class CreateArticle extends Component {
  render() {
    const {
      onSubmit,
      onChange,
      title,
      body,
      description,
      isLoading,
      onEditorStateChange,
      uploadImageCallBack,
      image,
      onImageClick,
      imageIsLoading,
      tagList,
    } = this.props;

    return (
      <section className="create-article-form">
        <div className="article">
          <h3 className="article-title text-uppercase text-center fadeInUp">
                        Publish your article
          </h3>
          <p className="text-center wow fadeInUp">
                        Once done, Click on Publish.
          </p>
          <Form id="form" className="article-form" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Title..."
                type="text"
                id="title"
                name="title"
                required
                maxLength="60"
                value={title}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description..."
                type="text"
                id="description"
                name="description"
                required
                maxLength="150"
                value={description}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Featured Image</Form.Label>
              <img className="form-image" alt="" src={image} />
              <div>
                                Choose Image
                <input className="img-btn" id="img_btn" type="file" name="file" accept="image/*" onChange={onImageClick} />
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className={imageIsLoading ? 'show' : 'hidden'} />
              </div>
            </Form.Group>
            <div className="editor-div" id="editor-div">
              <Editor
                className="editor"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                placeholder="Body..."
                id="editor"
                editorState={body}
                onEditorStateChange={onEditorStateChange}
                hashtag={{
                  separator: ' ',
                  trigger: '#',
                }}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image', 'remove', 'colorPicker', 'history'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                  },
                  fontSize: {
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                  },
                  image: {
                    uploadCallback: uploadImageCallBack,
                    className: 'detail-image',
                    alignmentEnabled: false,
                    previewImage: true,
                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    alt: {
                      present: true,
                      mandatory: true,
                    },
                    defaultSize: {
                      height: '100%',
                      width: '95%',
                    },
                  },
                }}
              />
            </div>
            <Form.Group className="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                placeholder="e.g. science, politics, movies"
                type="text"
                id="tagList"
                name="tagList"
                value={tagList}
                onChange={onChange}
                required
              />
            </Form.Group>
            {!isLoading ? (
              <Button className="submit-btn" id="btn" type="submit" block>
                                Publish
              </Button>
            ) : (
              <Button id="spinner-loading" variant="primary" disabled block>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    Loading...
              </Button>
            )}
          </Form>
        </div>
      </section>
    );
  }
}

CreateArticle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({}).isRequired,
  description: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  uploadImageCallBack: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  imageIsLoading: PropTypes.bool.isRequired,
  tagList: PropTypes.string.isRequired,
};

export default CreateArticle;
