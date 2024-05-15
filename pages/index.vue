<script setup>
import MenuNewProducts from "~/components/common/MenuNewProducts.vue";
import CategoryProducts from "~/components/common/CategoryProducts.vue";
import MenuHotDealProducts from "~/components/common/MenuHotDealProducts.vue";
import MenuT1Products from "~/components/common/MenuT1Products.vue";
import MenuGundamProducts from "~/components/common/MenuGundamProducts.vue";
 
const intervalImg = ref();
const checkInterval = ref(false);
const handleClickItem = (index, isInterval = false) => {
  if (!isInterval) {
    checkInterval.value = false;
    clearInterval(intervalImg.value);
  }
  const newsNavs = document.getElementsByClassName("news-nav");
  document.getElementById(`slide${index + 1}`).click();
  if (newsNavs && newsNavs.length > 0) {
    for (let i = 0; i < newsNavs.length; i++) {
      if (i === index) {
        newsNavs[i].classList.add("is-active");
      } else {
        newsNavs[i].classList.remove("is-active");
      }
    }
  }
};
 
onMounted(() => {
  checkInterval.value = true;
  intervalImg.value = setInterval(() => {
    if (checkInterval.value) {
      handleClickItem(1, true);
    }
    setTimeout(() => {
      if (checkInterval.value) {
        handleClickItem(2, true);
      }
      setTimeout(() => {
        if (checkInterval.value) {
          handleClickItem(0, true);
        }
      }, 2000);
    }, 2000);
  }, 6000);
});
 
onUnmounted(() => {
  clearInterval(intervalImg.value);
});
</script>
 
<template>
  <div class="flex flex-col">
    <div class="picture-paddyfield h-[730px]">
      <div class="khoi_anh">
        <div id="homepage-slider" class="st-slider h-full w-full">
          <input
            type="radio"
            class="cs_anchor radio"
            name="slider"
            id="slide1"
          />
          <input
            type="radio"
            class="cs_anchor radio"
            name="slider"
            id="slide2"
          />
          <input
            type="radio"
            class="cs_anchor radio"
            name="slider"
            id="slide3"
          />
          <div class="images">
            <div class="images-inner">
              <div class="image-slide">
                <img
                  class="image"
                  src="https://theme.hstatic.net/1000026602/1001232314/14/slideshow_1.jpg?v=107"
                />
              </div>
              <div class="image-slide">
                <img
                  class="image"
                  src="https://theme.hstatic.net/1000026602/1001232314/14/slideshow_3.jpg?v=107"
                />
              </div>
              <div class="image-slide">
                <img
                  class="image"
                  src="https://theme.hstatic.net/1000026602/1001232314/14/slideshow_2.jpg?v=107"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <div
      class="max-w-[1200px] flex flex-col items-center justify-center mt-10 mx-auto"
    >
      <div class="w-full">

          <MenuNewProducts />
 
          <MenuHotDealProducts />
 
          <MenuGundamProducts />
 
          <MenuT1Products />
      </div>
    </div>
  </div>
</template>
 
<style lang="scss"></style>



<!-- <script setup>
import MenuNewProducts from "~/components/common/MenuNewProducts.vue";
import CategoryProducts from "~/components/common/CategoryProducts.vue";
import MenuHotDealProducts from "~/components/common/MenuHotDealProducts.vue";
import MenuT1Products from "~/components/common/MenuT1Products.vue";
import MenuGundamProducts from "~/components/common/MenuGundamProducts.vue";

const intervalImg = ref()
const checkInterval = ref(false)
const handleClickItem = (index, isInterval = false) => {
    if(!isInterval){
        checkInterval.value = false
        clearInterval(intervalImg.value)
    }
    const newsNavs = document.getElementsByClassName("news-nav")
    document.getElementById(`slide${index + 1}`).click()
    if (newsNavs && newsNavs.length > 0) {
        for (let i = 0; i < newsNavs.length; i++) {
            if (i === index) {
                newsNavs[i].classList.add('is-active');
            } else {
                newsNavs[i].classList.remove('is-active');
            }
        }
    }
}

onMounted(() => {
    checkInterval.value = true
    intervalImg.value = setInterval(() => {
       if(checkInterval.value){
           handleClickItem(1, true)
       }
        setTimeout(() => {
           if(checkInterval.value){
               handleClickItem(2, true)
           }
            setTimeout(() => {
                if(checkInterval.value){
                    handleClickItem(3, true)
                }
                setTimeout(() => {
                    if(checkInterval.value){
                        handleClickItem(0, true)
                    }
                }, 6000)
            }, 6000)
        }, 6000)
    }, 6000)
})

onUnmounted(() => {
    clearInterval(intervalImg.value)
})
</script>

<template>
    <div class="flex flex-col">
        <div class="picture-paddyfield h-[720px]">
            <div class="khoi_anh">
                <div id="homepage-slider" class="st-slider h-full w-full">
                    <input type="radio" class="cs_anchor radio" name="slider" id="slide1"/>
                    <input type="radio" class="cs_anchor radio" name="slider" id="slide2"/>
                    <input type="radio" class="cs_anchor radio" name="slider" id="slide3"/>
                    <input type="radio" class="cs_anchor radio" name="slider" id="slide4"/>
                    <div class="images">
                        <div class="images-inner">
                            <div class="image-slide">
                                <img class="image"
                                     src="https://theme.hstatic.net/1000026602/1001232314/14/slideshow_3.jpg?v=107">
                            </div>
                            <div class="image-slide">
                                <img class="image"
                                     src="https://theme.hstatic.net/1000026602/1001232314/14/slideshow_1.jpg?v=107">
                            </div>
                            <div class="image-slide">
                                <img class="image"
                                     src="https://theme.hstatic.net/1000026602/1001232314/14/img-banner-index.jpg?v=107">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full h-12 bg-black text-white text-xl flex justify-around items-end">
            <div class="w-[240px] h-full news-nav is-active" @click="handleClickItem(0)">
                <div class="w-full h-full flex cursor-pointer justify-center items-center rounded-t-2xl hover:text-red-500">
                </div>
            </div>

            <div class="w-[240px] h-full news-nav" @click="handleClickItem(1)">
                <div class="w-full h-full flex cursor-pointer justify-center items-center rounded-t-2xl hover:text-red-500">
                </div>
            </div>
            <div class="w-[240px] h-full news-nav" @click="handleClickItem(2)">
                <div class="w-full h-full flex cursor-pointer justify-center items-center rounded-t-2xl hover:text-red-500">
                </div>
            </div>
        </div>

        <div class="w-4/5 flex flex-col items-center justify-center mt-4 mx-auto">
            <div class=" w-full bg-red-600 h-10 flex ">
                <div class="w-1/6 bg-red-800 flex items-center justify-center">
                    <span class="text-xl font-bold flex text-white">
                        Hàng mới về
                    </span>
                </div>
            </div>
            <div class="w-full">
                <MenuNewProducts/>
                <CategoryProducts>
                    <MenuHotDealProducts/>

                    <img class="w-full rounded-xl" src="https://herogame.vn/upload/images/full/6535f4c2c0444Untitled-1.gif" alt="">

                    <MenuGundamProducts/>

                    <img class="w-full h-56 border-solid border-2 rounded-xl " src="https://i.neoseeker.com/mgv/395304/304/78/gundamneowikiheader.png" alt="">

                    <MenuT1Products/>

                    <img class="w-full h-56 rounded-xl" src="https://static.invenglobal.com/upload/image/2021/03/20/i1616245833067538.jpeg" alt="">
                </CategoryProducts>


            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style> -->
