<template>
  <div class="view-layout bg-white">
    <div class="content-wrapper">
<!--      <el-skeleton animated :rows="10" :loading="isLoading">-->
<!--        <div class="l text-font">-->
<!--          <h2 v-h2 style="margin-top: 0; font-weight: 600"-->
<!--            >北京思拓合众科技有限公司</h2-->
<!--          >-->
<!--          <p>-->
<!--            北京思拓合众科技有限公司（简称“思拓”），产品创新型融媒体技术厂商，拥有19年内容生产管理和15年内容营销业务系统技术经验。-->
<!--          </p>-->
<!--          <p>-->
<!--            思拓由知名开源内容管理软件PHPCMS创始人钟胜辉先生创办于2009年，总部位于北京中关村，在武汉、南京和乌鲁木齐设立了分支机构，现有员工100余人。-->
<!--          </p>-->
<!--          <p>-->
<!--            思拓拥有系列自主知识产权软件产品，已服务媒体、政府、高校、军队和集团企业等各领域800多家客户。-->
<!--          </p>-->
<!--          <div class="info-wrapper">-->
<!--            <img src="/images/info/info-1.svg" alt="" loading="eager" />-->
<!--            <img src="/images/info/info-2.svg" alt="" loading="eager" />-->
<!--            <img src="/images/info/info-3.svg" alt="" loading="eager" />-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-skeleton>-->
      <div class="l text-font">
        <h2 v-h2 style="margin-top: 0; font-weight: 600"
        >北京思拓合众科技有限公司</h2
        >
        <p>
          北京思拓合众科技有限公司（简称“思拓”），产品创新型融媒体技术厂商，拥有19年内容生产管理和15年内容营销业务系统技术经验。
        </p>
        <p>
          思拓由知名开源内容管理软件PHPCMS创始人钟胜辉先生创办于2009年，总部位于北京中关村，在武汉、南京和乌鲁木齐设立了分支机构，现有员工100余人。
        </p>
        <p>
          思拓拥有系列自主知识产权软件产品，已服务媒体、政府、高校、军队和集团企业等各领域800多家客户。
        </p>
        <div class="info-wrapper">
          <img src="/images/info/info-1.svg" alt="" loading="eager" />
          <img src="/images/info/info-2.svg" alt="" loading="eager" />
          <img src="/images/info/info-3.svg" alt="" loading="eager" />
        </div>
      </div>
      <div class="r">
        <img
          src="/images/about-us.png"
          alt=""
          loading="lazy"
          style="border-radius: 10px"
        />
      </div>
    </div>
    <ResourceItem :data="resourceMap.get('关于我们1')">
      <template #desc>
        <p class="value">
          客户成功 互相成就 卓越运营 实事求是 敬畏专业 简化创新
        </p>
      </template>
    </ResourceItem>
  </div>
</template>

<script setup lang="ts">
  import useResource from '~/hooks/resource';

  const { resourceMap } = useResource();
  // const isLoading = ref<boolean>(false);

  // async function onLoadingFinish() {
  //   isLoading.value = false;
  // }

  // onMounted(() => {
  //   isLoading.value = true;
  // });

  useHead({
    meta: [
      {
        name: 'description',
        content:
          '视频大脑是专为内容营销团队打造的“编、拍、剪、投、察”全流程生产系统。整合策划、拍摄、剪辑、发布、分析，一站式解决视频生产难题，大幅提升团队效率与内容效果。立即免费试用！\n' +
          '内容营销团队必备！视频大脑覆盖视频策划、制作、剪辑、发布、数据分析全流程，告别工具切换，释放创意潜能，让高质量视频生产更简单、更高效！\n' +
          '提升视频营销效率？选视频大脑！专为内容营销团队设计的一站式“编拍剪投察”生产系统，无缝协作，数据驱动决策，助力内容效果最大化。',
      },
    ],
  });
</script>

<style scoped lang="less">

  .bg-white {
    background: linear-gradient(
      180deg,
      #fcf9ff 0%,
      rgba(255, 255, 255, 0.8) 100%
    );
    padding: 0 1rem;
  }
  .value {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 22px;
    leading-trim: NONE;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    margin: 0;
  }

  .content-wrapper {
    width: 100%;
    height: auto;
    padding-top: 6rem;
    display: flex;
    max-width: 60rem;
    min-height: 410px;
    justify-content: center;
    box-sizing: border-box;
    gap: 1rem;

    .l {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p,
      h2 {
        margin: 0;
      }

      .info-wrapper {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
        overflow: hidden;
        margin-top: auto;

        img {
          width: 100%;
          height: 5.5rem;
          object-position: center;
          object-fit: contain;
        }
      }
    }

    .r {
      width: 100%;
      // height: fit-content;
      display: flex;

      img {
        width: 100%;
        // height: fit-content;
        object-fit: contain;
        object-position: center;
      }
    }
  }

  @media (min-width: 1024px) {
    .content-wrapper {
      .l {
        height: fit-content;

        p,
        h2 {
          line-height: 1.8rem;
        }
      }
    }

    .value {
      background: linear-gradient(90deg, #c62eec 0%, #3881f7 48.5%, #03a6fa 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      flex-direction: column;
      padding: 5rem 1rem 0;

      .r {
        height: auto !important;
        margin: 0 !important;
      }
    }

    .value {
      line-height: 1.8rem;
      color: #03a6fa;
    }
  }
</style>
