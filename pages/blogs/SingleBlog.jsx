import React, { Component, Fragment } from "react";
import styles from "../../assets/styles/blog.module.css";
import { Button } from "@material-ui/core";
import debug from "debug";
import * as blogService from "../../services/blogService";
import clsx from "clsx";
import PropTypes from 'prop-types';
import Comments from "../../components/comments/Comments";

const _logger = debug("State:Blog");

class SingleBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        blogTypeId: 0,
        title: "",
        subject: "",
        content: "",
        imageUrl: "",
        isPublished: false,
        dateCreated: "",
        avatarUrl: "",
        firstName: "",
        lastName: "",
      },
    };
  }

  componentDidMount() {
    const blogId = this.props.match.params.blogId;
    blogService
      .getById(blogId)
      .then(this.getBlogSuccess)
      .catch(this.getBlogError);
  }

  getBlogSuccess = (response) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        blog: response.item,
      };
    });
  };

  getBlogError = (errResponse) => {
    _logger(errResponse.message);
  };

  onEditClick = (blog) => {
    const editBlogPayload = {
      id: this.props.match.params.blogId,
      blogTypeId: this.state.blog.blogTypeId,
      title: this.state.blog.title,
      subject: this.state.blog.subject,
      content: this.state.blog.content,
      imageUrl: this.state.blog.imageUrl,
      isPublished: this.state.blog.isPublished,
      avatarUrl: this.state.blog.avatarUrl,
      firstName: this.state.blog.firstName,
      lastName: this.state.blog.lastName,
    }
    _logger("edit Clicked fired, param ->",blog)
    this.props.history.push(`/postBlog/edit`, { type: "EDIT_BLOG", payload: editBlogPayload });
  };

  getBlogType = (blogTypeId) => {
    if (blogTypeId === 1) {
      return "Health";
    } else if (blogTypeId === 2) {
      return "Life Style";
    } else if (blogTypeId === 3) {
      return "Fitness";
    }
  };

  render() {
    return (
      <div className={styles.singleBlog}>
        <img
          src={this.state.blog.imageUrl}
          className="card-img-top"
          alt="imageUrl"
          width="300"
          height="500"
        />
        <table className={styles.table}>
          <tr>
            <th>
              <img
                src={this.state.blog.avatarUrl}
                className="avatar-icon border-2 border-white rounded"
                alt="avatarUrl"
              />
            </th>
            <th>
              {this.state.blog.firstName} {this.state.blog.lastName}
            </th>
          </tr>
        </table>
        <h3 className={styles.blogTitle}>{this.state.blog.title}</h3>
        <div className={styles.subTitle}>
          <div>
            <span className="font-weight-bold">Blog Type: </span>
            <span>{this.getBlogType(this.state.blog.blogTypeId)}</span>
          </div>
          <div id="datePublish">
            <span className="font-weight-bold">Date Created: </span>
            <span>{this.state.blog.dateCreated.slice(0, 10)}</span>
          </div>
        </div>
        <div>
          <p
            className={clsx("card-text mb-4", styles.blogContentTwo)}
            dangerouslySetInnerHTML={{ __html: this.state.blog.content }}
          ></p>
        </div>
        <div className={styles.btnWrapper}>
          <Button variant="contained" color="secondary" onClick={this.onEditClick}>Edit</Button>
        </div>
        <div>
          <Comments></Comments>
        </div>
      </div>
    );
  }
}

SingleBlog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      blogId: PropTypes.number,
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
}

export default SingleBlog;


//style={{marginLeft:"10px",marginBottom:"10px"}}