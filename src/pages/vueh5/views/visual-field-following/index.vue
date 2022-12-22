<template>
  <div class="centent">
    <svg
      data-v-5d3d8b0b=""
      id="logo_svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 734 554.58"
    >
      <g data-v-5d3d8b0b="" id="wrapper" data-name="图层 2">
        <g data-v-5d3d8b0b="" id="face" data-name="图层 1" fill="#fff">
          <path
            data-v-5d3d8b0b=""
            d="M711.91,360,520.69,81a186.32,186.32,0,0,0-307.38,0L22.09,360c-26.55,38.74-29.33,86.68-7.44,128.23s63,66.36,110,66.36H609.37c47,0,88.08-24.81,110-66.36S738.46,398.73,711.91,360ZM367,329.86c74.92,0,135.88,43,135.88,95.83s-61,95.82-135.88,95.82-135.88-43-135.88-95.82S292.08,329.86,367,329.86Zm176,95.83c0-32.79-14.79-64-41.81-88.39a57.24,57.24,0,1,0-96.07-44.4,233.21,233.21,0,0,0-76.22,0,57.24,57.24,0,1,0-96.07,44.4c-27,24.43-41.81,55.6-41.81,88.39,0,33.2,14.88,64.27,42.24,88.78H124.63c-31.82,0-59.66-16.81-74.49-45s-13-60.61,5-86.85l191.22-279C274.08,63.27,318,40.11,367,40.11s92.92,23.16,120.6,63.55l191.22,279c18,26.24,19.87,58.71,5,86.85s-42.67,45-74.49,45H500.76C528.11,490,543,458.89,543,425.69Z"
            class="cls-1"
          ></path>
        </g>
        <g
          data-v-5d3d8b0b=""
          id="nose"
          data-name="图层 1"
          fill="#fff"
          transform="translate(13.60081135328548, -1.3109917530108988)"
        >
          <path
            data-v-5d3d8b0b=""
            d="M349.43,410.21a21.3,21.3,0,0,0,35.14,0l23.19-33.83a13.79,13.79,0,0,0-11.37-21.58H337.61a13.79,13.79,0,0,0-11.37,21.58Z"
            class="cls-1"
          ></path>
        </g>
        <circle
          data-v-5d3d8b0b=""
          r="24"
          fill="black"
          transform="translate(297.4478007306761, 284.46662534712266) scale(1, 0.9961503835103371)"
        ></circle>
        <circle
          data-v-5d3d8b0b=""
          r="24"
          fill="black"
          transform="translate(488.95544468246584, 282.42345712276835) scale(1, 0.9961503835103371)"
        ></circle>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'VisualFieldFollowing',
  data() {
    return {}
  },
  mounted() {
    const nose = document.getElementById('nose')

    const eyes = document.querySelectorAll('circle')

    window.document.body.addEventListener('mousemove', e => {
      // 获取鼠标当前位置
      let x = e.clientX
      let y = e.clientY
      // 计算鼠标位置距离眼睛的长度值
      let ex = x - (window.innerWidth - 600) / 2 - 220
      let ey = y - (window.innerHeight - 453) / 2 - 240

      // 眼珠子可以转动的半径为20
      let angle = ex / ey
      let sy =
        ey > 0
          ? Math.cos(Math.atan(angle)) * 20
          : -Math.cos(Math.atan(angle)) * 20
      let sx =
        ey > 0
          ? Math.sin(Math.atan(angle)) * 20
          : -Math.sin(Math.atan(angle)) * 20
      eyes[0].setAttribute('transform', `translate(${sx + 270}, ${sy + 290})`)
      eyes[1].setAttribute('transform', `translate(${sx + 462}, ${sy + 290})`)
      // 鼻子幅度小一点
      nose.setAttribute('transform', `translate(${sx / 5}, ${sy / 5})`)
    })
  },
}
</script>
<style lang="scss" scoped>
html,
body {
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.centent {
  height: 1000px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo_svg {
  width: 600px;
  height: 453px;
}
</style>
