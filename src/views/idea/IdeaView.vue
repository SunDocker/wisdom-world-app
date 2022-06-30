<template>
  <div class="me-view-body">
    <el-container class="me-view-container">
      <!--<el-aside class="me-area">-->
      <!--<ul class="me-operation-list">-->
      <!--<li class="me-operation-item">-->
      <!--<el-button type="primary" icon="el-icon-edit"></el-button>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</el-aside>-->
      <el-main>
        <div class="me-view-card">

          <h1 class="me-view-title">{{ idea.title }}</h1>

          <div class="me-view-author">
            <a class="">
              <img class="me-view-picture" :src="idea.author.avatar"/>
            </a>
            <div class="me-view-info">
              <span>{{ idea.author.nickname }}</span>
              <div class="me-view-meta">
                <span>{{ fmtTime }}</span>
                &nbsp;&nbsp;<span>阅读   {{ idea.viewCounts }}</span>
                &nbsp;&nbsp;<span>评论   {{ idea.commentCounts }}</span>
              </div>

            </div>
            <el-button type="primary"
                       @click="showIdeaTree()"
                       style="margin-left: auto"
                       size="mini"
                       round>查看idea树
            </el-button>
            <el-button v-if="!this.$store.state.id"
                       style=""
                       size="mini"
                       round>
              要解锁其他功能，请先登录哦
            </el-button>
            <el-button
                v-if="this.$store.state.id && !isCollectedByCurrentUser"
                @click="collect()"
                type="primary"
                round
                icon="el-icon-star-off"
                size="mini"
                style="">收藏
            </el-button>
            <el-button
                v-if="this.$store.state.id && isCollectedByCurrentUser"
                @click="cancelCollection()"
                type="primary"
                round
                icon="el-icon-star-on"
                size="mini"
                style="">取消收藏
            </el-button>
            <el-button
                v-if="this.idea.author.id === this.$store.state.id"
                @click="editIdea()"
                style=""
                size="mini"
                round
                icon="el-icon-edit">编辑
            </el-button>
            <el-button v-if="this.$store.state.id"
                       @click="extendIdea()"
                       style=""
                       size="mini"
                       round
                       icon="el-icon-edit">延伸
            </el-button>
          </div>

          <div class="me-view-content">
            <MarkdownEditor :editor=idea.editor
                            :editable="false"
                            :subfield="false"
                            :toolbars-flag="false"
                            :default-open="'preview'"></MarkdownEditor>
          </div>

          <div class="me-view-end">
            <el-alert
                title="--- End ---"
                type="info"
                center
                :closable="false">
            </el-alert>
          </div>

          <div class="me-view-tag">
            Idea标签：
            <!--<el-tag v-for="t in article.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagName}}</el-tag>-->
            <el-button @click="tagOrCategory('tag', t.id)"
                       size="mini"
                       type="primary"
                       v-for="t in idea.tags"
                       :key="t.id" round plain>{{ t.tagName }}
            </el-button>
          </div>

          <div class="me-view-tag">
            Idea分类：
            <!--<span style="font-weight: 600">{{article.category.categoryName}}</span>-->
            <el-button @click="tagOrCategory('category', idea.category.id)"
                       size="mini"
                       type="primary"
                       round
                       plain>
              {{ idea.category.categoryName }}
            </el-button>
          </div>

          <div class="me-view-comment">
            <div class="me-view-comment-write">
              <el-row :gutter="20">
                <el-col :span="2">
                  <a class="">
                    <img class="me-view-picture" :src="commentAvatar"/>
                  </a>
                </el-col>
                <el-col :span="22">
                  <el-input
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="你的评论..."
                      class="me-view-comment-text"
                      v-model="comment.content"
                      resize="none">
                  </el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="2" :offset="22">
                  <el-button type="text" @click="publishComment()">评论</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="me-view-comment-title">
              <span>{{ idea.commentCounts }} 条评论</span>
            </div>

            <CommentItem
                v-for="(c,index) in comments"
                :comment="c"
                :ideaId="idea.id"
                :index="index"
                :rootCommentCounts="comments.length"
                @commentCountsIncrement="commentCountsIncrement"
                :key="c.id">
            </CommentItem>

          </div>

          <el-dialog title="Idea Tree"
                     width="80%"
                     :visible.sync="ideaTreeVisible"
                     :close-on-click-modal=false
                     custom-class="me-dialog">

            <el-scrollbar>
              <IdeaTree :nodeData="ideaTree"
                        direction="vertical"
                        style="padding: 6px 6px 20px 6px;margin: auto"
                        @onClick="onItem($event.nodeData,$event.parentNode,$event.zIndex)"></IdeaTree>
            </el-scrollbar>
          </el-dialog>

        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import {formatTime} from "@/utils/time";
import {getIdeaById, getIdeaTree, isCollected, collect, cancelCollection} from "@/api/idea";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import CommentItem from "@/components/comment/CommentItem";
import {getCommentList, publishComment} from "@/api/comment";
import IdeaTree from "@/components/common/IdeaTree";

export default {
  name: "IdeaView",
  components: {
    MarkdownEditor,
    CommentItem,
    IdeaTree
  },
  data() {
    return {
      idea: {
        category: {},
        editor: {},
        author: {}
      },
      comments: [],
      comment: {
        content: ''
      },
      //commentAvatar: this.$store.state.avatar ? this.$store.state.avatar : 'static/user/admin.png',
      ideaTreeVisible: false,
      ideaTree: {
        id: '',
        name: '测试根',
        children: [
          {id: '', name: '测试孩子1', children: []},
          {
            id: this.$route.params.id, name: '测试孩子2', children: [
              {
                id: '', name: '测试孙子1', children: [
                  {
                    id: '', name: '测试孩子1', children: [
                      {
                        id: '', name: '测试孩子1', children: [
                          {
                            id: '', name: '测试孩子1', children: [
                              {
                                id: '', name: '测试孩子1', children: [
                                  {
                                    id: '', name: '测试孩子1', children: [
                                      {
                                        id: '', name: '测试孩子1', children: [
                                          {
                                            id: '', name: '测试孩子1', children: [
                                              {
                                                id: '', name: '测试孩子1', children: [
                                                  {id: '', name: '测试孩子1', children: []},
                                                ]
                                              },
                                            ]
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  }
                ]
              },
              {id: '', name: '测试孙子2', children: []}
            ]
          },
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
          {id: '', name: '测试孩子1', children: []},
        ]
      },
      isCollectedByCurrentUser: false
    }
  },
  computed: {
    fmtTime() {
      return formatTime(this.idea.createDate)
    },
    commentAvatar() {
      return this.$store.state.avatar ? this.$store.state.avatar : 'static/user/admin.png'
    },
  },
  methods: {
    getIdeaById() {
      let id = this.$route.params.id
      getIdeaById(id).then(res => {
        if (res.data.success) {
          this.idea = res.data.data
          this.idea.editor = {value: this.idea.body.content}
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('系统错误')
      });
    },
    getCommentList() {
      let id = this.$route.params.id
      getCommentList(id).then(res => {
        if (res.data.success) {
          this.comments = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('系统错误')
      });
    },
    commentCountsIncrement() {
      this.idea.commentCounts++
    },
    editIdea() {
      this.$router.push({path: `/write/${this.idea.id}`})
    },
    tagOrCategory(type, id) {
      console.log(type, id)
    },
    publishComment() {
      if (!this.comment.content) {
        return;
      }
      this.comment.ideaId = this.idea.id
      let params = {ideaId: this.idea.id, content: this.comment.content, parentId: 0, toUserId: 0}
      publishComment(params).then(res => {
        if (res.data.success) {
          this.$message({type: 'success', message: '评论成功', showClose: true})
          this.comment.content = ''
          this.comments.unshift(res.data.data);
          this.commentCountsIncrement();
        } else {
          this.$message({type: 'error', message: res.data.msg, showClose: true})
        }

      }).catch(error => {
        if (error !== 'error') {
          this.$message({type: 'error', message: '评论失败', showClose: true})
        }
      })
    },
    extendIdea() {
      this.$router.push({path: `/write/${this.idea.id}/1`})
    },
    showIdeaTree() {
      getIdeaTree(this.$route.params.id).then(res => {
        if (res.data.success) {
          this.ideaTree = res.data.data
          this.ideaTreeVisible = true;
        } else {
          this.$message.warning(res.data.msg)
        }
      }).catch(err => {
        console.warn(err)
        this.$message.warning('系统错误')
      });
    },
    onItem(nodeData) {
      this.ideaTreeVisible = false
      if (nodeData.id !== this.$route.params.id) {
        this.$router.push(`/view/${nodeData.id}`);
      }
    },
    setCollection() {
      isCollected(this.$store.state.id, this.$route.params.id).then(res => {
        if (res.data.success) {
          this.isCollectedByCurrentUser = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.$message.error('系统错误')
        console.error(err)
      });
    },
    collect() {
      this.isCollectedByCurrentUser = true
      collect(this.idea.id).then(res => {
        if (res.data.success) {
          this.$message({type: 'success', message: '收藏成功', showClose: true})
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        this.$message.error(err)
      });
    },
    cancelCollection() {
      this.isCollectedByCurrentUser = false
      cancelCollection(this.idea.id).then(res => {
        if (res.data.success) {
          this.$message({type: 'success', message: '取消收藏成功', showClose: true})
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        this.$message.error(err)
      });
    },
  },
  created() {
    this.getIdeaById()
    this.getCommentList()
    this.setCollection()
  },
}
</script>

<style>
.me-view-body {
  margin: 100px auto 140px;
}

.me-view-container {
  width: 800px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  margin-bottom: 18px;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #52a2f3;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 30px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}

</style>