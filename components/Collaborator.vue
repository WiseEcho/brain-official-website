<template>
  <div class="segment-content">
    <div class="content-wrapper text-font">
      <h2 v-h1 style="color: #504288" class="label"> 合作伙伴 </h2>
      <div class="card-list">
        <div
          v-for="(item, index) in collaborators"
          :key="index"
          class="card-item"
        >
          <el-image :src="item" fit="contain" class="img" alt="" />
        </div>
      </div>
      <h2 v-h1 style="color: #504288" class="label"> 用户反馈 </h2>
      <CustomEvaluation :data="customs" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CustomEvaluation from '~/components/CustomEvaluation.vue';

  type customInfo = {
    sponsor: string;
    brand: string;
    brandLogo: string;
    poster: string;
    desc: string;
  };

  type customCard = Partial<customInfo>[];
  const collaborators: string[] = [
    '/home/images/collaborators/aliyun.png',
    '/home/images/collaborators/baidu.png',
    '/home/images/collaborators/bytedangce.png',
    '/home/images/collaborators/changjiang.png',
    '/home/images/collaborators/douyin.png',
    '/home/images/collaborators/huawei.png',
    '/home/images/collaborators/kuaishou.png',
    '/home/images/collaborators/muyumu.png',
    '/home/images/collaborators/qiniu.png',
    '/home/images/collaborators/rednote.png',
    '/home/images/collaborators/tencent.svg',
    '/home/images/collaborators/tianyi.png',
  ];
  const customs: customCard = [
    {
      poster: '/home/images/custom/custom-1.png',
      desc:
        '在兴趣电商日益严苛的素材需求下，内部团队的协作成本和制作开销水涨船高。视频大脑的出现，正是解决这一难题的关键。\n' +
        '通过建立专属的产品素材库，视频大脑让剪辑人员能够快速复用素材，减少了重复拍摄的工作量。这样，摄像师能够专注于创作更多精品素材，剪辑团队也能高效找到所需素材，大幅提升了出片速度和整体效率。而投放团队，借助视频大脑的批量计划搭建功能，精准投放的效率也得到了质的飞跃。',
      brand: '芊小白',
      sponsor: '总经理',
      brandLogo: '/home/images/custom/logo/brand1-logo.svg',
    },
    {
      poster: '/home/images/custom/custom-2.png',
      desc: '视频大脑的引入，带来显著变化：一是高效协作：素材共享与批注功能，甲方修改意见清晰可见，修改版本减少50%。二是周期缩短：从拍摄到投流的周期大幅压缩，提升响应速度。三是GMV提升：投放效率提升，直接推动GMV增长。四是自动化考核：团队考核数据自动生成，节省大量人工时间，提升战斗力。视频大脑助力代运营团队提升执行效率、优化投放流程、快速响应市场需求，为企业主创造更多价值。',
      brand: '木与木',
      sponsor: '创始人',
      brandLogo: '/home/images/custom/logo/brand2-logo.svg',
    },
  ];
</script>

<style scoped lang="less">
  .segment-content {
    padding: 0 1rem;

    .content-wrapper {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      p {
        margin-bottom: 0;
      }

      .label {
        margin-bottom: 0;
      }

      .card-list {
        width: 100%;
        height: fit-content;
        max-width: 60rem;
        display: grid;
        grid-auto-rows: minmax(9rem);
        gap: 1.5rem;

        .card-item {
          width: 100%;
          height: fit-content;
          border-radius: 10px;
          background-color: #f3dfff26;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.5s ease;
        }

        .card-item::before {
          content: '';
          display: flex;
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          border-radius: 10px;
          pointer-events: none;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .label {
      margin-top: 2rem;
    }

    .card-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 768px) {
    .card-list {
      grid-template-columns: repeat(3, 1fr);
    }

    .label {
      margin-top: 1rem;
    }
  }
</style>
