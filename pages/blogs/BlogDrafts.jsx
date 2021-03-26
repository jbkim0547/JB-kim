import React, { Fragment } from "react";
import { WrapperSimple } from "../../layouts";
import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { PostAdd, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/blog.module.css";
import * as blogService from "../../services/blogService";
import Alert from "../../assets/components/Alert";
import debug from "sabio-debug";
import clsx from "clsx";

const _logger = debug.extend("BlogDrafts");

 class BlogDrafts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarShow: false,
      severity: "error",
      barMessage: "",
      keyword: "",
      blogs: [],
      page: {
        pageIndex: 0,
        pageSize: 6,
        totalCount: 0,
        totalPages: 0,
      },
    };
  }

  componentDidMount() {
    this.getAllBlogs();
  }

  getAllBlogs = () => {
    const { pageIndex, pageSize } = this.state.page;
    const payload = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
    blogService
      .getAll(payload)
      .then(this.getAllSuccess)
      .catch(this.getAllError);
      
  };

  getAllSuccess = (response) => {
    if (response.isSuccessful) {
      this.setState((prevState) => ({
        blogs: response.item.pagedItems,
        page: {
          ...prevState.page,
          totalCount: response.item.totalCount,
          totalPages: response.item.totalPages,
        },
      }));
    }
    _logger("Blogs:",response.item.pagedItems);
  };

  getAllError = (errResponse) => {
    _logger(errResponse.message);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  search = () => {
    const { keyword } = this.state;
    const { pageIndex, pageSize } = this.state.page;
    _logger("keyword: ", keyword);
    const payload = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      keyword: keyword,
    };
    blogService
      .search(payload)
      .then(this.getAllSuccess)
      .catch(this.searchError);
  };

  searchError = (errResponse) => {
    _logger(errResponse.message);
  
  };

  newBadge = (dateCreated) => {
    const createDate = new Date(dateCreated);
    const time = Date.now() - createDate.getTime();

    if (time < 1000 * 60 * 60 * 24 * 3) {
      return <div className="badge badge-danger">NEW</div>;
    }
    return null;
  };

  mappedBlog = (blog) => {
    return (
      <Grid item xs={8} md={4} key={blog.id}>
        <Card className={clsx("mb-4", styles.blogGrid)}>
          <div className="card-img-wrapper">
            <div className="card-badges">{this.newBadge(blog.dateCreated)}</div>
            <img
              src={blog.imageUrl}
              className={clsx("card-img-top", styles.bgImage)}
              alt="..."
            />
          </div>
          <div
            className="card-body card-body-avatar"
            style={{ backgroundColor: "#e6eeff" }}
          >
            <div className="avatar-icon-wrapper avatar-icon-xl">
              <div className="avatar-icon border-2 border-white rounded">
                <img src={blog.avatarUrl} alt="..." />
              </div>
            </div>
            <h5 className={clsx("display-4 my-4", styles.title)}>
              <a href="#/" onClick={(e) => e.preventDefault()}>
                {blog.title}
              </a>
            </h5>
            <p
              className={clsx("card-text mb-4", styles.blogContent)}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></p>
            <Link to={"/SingleBlog/" + blog.id}>
              <Button variant="contained" color="secondary">
                <span className="btn-wrapper--label">Read more</span>
              </Button>
            </Link>
          </div>
          <Snackbar
            open={this.state.snackbarShow}
            autoHideDuration={3000}
            onClose={this.handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity={this.state.severity}>
              {this.state.barMessage}
            </Alert>
          </Snackbar>
        </Card>
      </Grid>
    );
  };

  onAddClicked = () => {
    return (
      <Link to="/PostBlog">
        <Button variant="contained" color="secondary" size="medium">
          <PostAdd />
          <span>Add</span>
        </Button>
      </Link>
    );
  };

  keywordChange = (event) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        keyword: event.target.value,
      };
    });
  };

  pageChange = (event, page) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          page: {
            ...prevState.page,
            pageIndex: page - 1,
          },
        };
      },
      () => {
        this.getAllBlogs();
      }
    );
  };

  render() {
    return (
      <Fragment>
        <WrapperSimple
          sectionHeading="BLOG DRAFTS"
          rightContent={this.onAddClicked()}
        >
          <div className={styles.search}>
            <TextField
              className={styles.searchInput}
              variant="outlined"
              margin="dense"
              fullWidth
              value={this.state.keyword}
              onChange={this.keywordChange}
              placeholder="Search by keyword"
            />
            <Button
              size="small"
              variant="contained"
              color="secondary"
              className={styles.searchBtn}
              onClick={this.search}
            >
              <Search />
            </Button>
          </div>
          <div className="py-5">
            <Container>
              <Grid container spacing={4}>
                {this.state.blogs.filter(function(blog){return blog.isPublished === false}).map(this.mappedBlog)}
              </Grid>
            </Container>
          </div>
          <Pagination
            className={styles.pagination}
            count={this.state.page.totalPages}
            variant="outlined"
            color="secondary"
            onChange={this.pageChange}
          />
        </WrapperSimple>
      </Fragment>
    );
  }
}
export default BlogDrafts;