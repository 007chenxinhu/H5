<template>
  <div class="fire"></div>
</template>

<script>
export default {
  name: 'Fire',
}
</script>

<style>
.fire {
  width: 200px;
  height: 100px;
  background-color: black;
  position: relative;
}

.fire::before,
.fire::after {
  content: '';
  position: absolute;
  bottom: 0;
}

.fire::before {
  left: -25px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ff530d;
  animation: fireLeft 1s ease-in-out infinite alternate;
}

.fire::after {
  right: -25px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ff530d;
  animation: fireRight 1s ease-in-out infinite alternate;
}

@keyframes fireLeft {
  from {
    transform: translateX(0) rotate(-45deg) scale(1);
    opacity: 0.5;
  }

  to {
    transform: translateX(-20px) rotate(-45deg) scale(1.2);
    opacity: 0;
  }
}

@keyframes fireRight {
  from {
    transform: translateX(0) rotate(45deg) scale(1);
    opacity: 0.5;
  }

  to {
    transform: translateX(20px) rotate(45deg) scale(1.2);
    opacity: 0;
  }
}
</style>
