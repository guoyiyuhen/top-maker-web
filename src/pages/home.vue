<template>
  <div class="home">
    <el-carousel :height="imgHeight + 'px'">
      <el-carousel-item v-for="item in swiper" :key="item.id">
        <img class="swiper-img" :src="item.image" @click="toDetail(item)" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="box">
      <div class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
        <img class="list-img" :src="item.thumb_image" alt />
        <div class="list-content">
          <div class="list-left">
            <h2>{{item.title}}</h2>
            <p>{{item.brief}}</p>
          </div>
          <div class="list-right">
            <img class="list-head" :src="item.designer.avatar" alt />
            <p>{{item.designer.name}}</p>
            <div class="follow">
              <div class="left">
                <img src="./../assets/image/logo_no.png" alt="赞" title="赞" />
                <span>{{item.favor_nums}}</span>
              </div>
              <div class="right">
                <img src="./../assets/image/yanjing.png" alt="浏览" title="浏览" />
                <span>{{item.views}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Works, Home } from "./../services/article";
let timer = null;
export default {
  components: {},
  data() {
    return {
      banIdx: 0,
      list: [],
      swiper: [],
    };
  },
  watch: {},
  computed: {
    imgHeight() {
      return Math.floor(this.$store.state.width / 3.7); //需要监听的数据
    },
  },
  destroyed() {
    clearInterval(timer);
  },
  mounted() {
    Home().then(
      (res) => {
        this.swiper = res.banners;
      },
      (err) => {
        this.$message.error(err.message);
      }
    );
    Works({ is_good: 1 }).then(
      (res) => {
        {
          this.list = res.items;
        }
      },
      (err) => {
        this.$message.error(err.message);
      }
    );
  },
  methods: {
    toDetail(item) {
      if (item.type && item.type == 2) {
        location.href = item.jump_url;
      } else {
        this.$router.push({
          path: "/detail/" + item.id,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../style/swiper.min.css";
.home {
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 496px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .swiper-img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .box {
    width: 1296px;
    margin: 40px auto;
    overflow: hidden;
    .list {
      width: 600px;
      cursor: pointer;
      height: 552px;
      box-shadow: 2px 2px 6px 0px rgba(126, 126, 126, 0.3);
      float: left;
      margin: 8px;
      .list-img {
        height: 400px;
        width: 600px;
      }
      .list-content {
        overflow: hidden;
        padding: 40px 0 28px 28px;
        .list-left {
          width: 440px;
          margin-right: 10px;
          float: left;
          h2 {
            font-size: 18px;
            font-weight: bold;
            color: rgba(62, 58, 57, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 12px;
            font-weight: 400;
            margin-top: 14px;
            color: rgba(159, 160, 160, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
        .list-right {
          width: 120px;
          float: right;
          .list-head {
            width: 28px;
            height: 27px;
            border-radius: 50%;
          }
          p {
            font-size: 12px;
            margin-top: 12px;
            margin-bottom: 3px;
            font-weight: 400;
            color: rgba(102, 100, 100, 1);
          }
          .follow {
            overflow: hidden;
            span {
              font-size: 12px;
              color: rgba(102, 100, 100, 1);
              float: left;
              margin-left: 3px;
            }
            .left {
              float: left;
              margin-right: 10px;
              img {
                float: left;
                margin-top: 1px;
              }
            }
            .right {
              float: left;
              img {
                margin-top: 1px;
                float: left;
              }
            }
          }
        }
      }
    }
  }
}
</style>