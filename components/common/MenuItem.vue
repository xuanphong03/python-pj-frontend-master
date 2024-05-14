<script setup>
import SubMenuItem from "~/components/common/SubMenuItem.vue";

const props = defineProps({
    item: {
        type: Object,
        default() {
            return null
        }
    }
})

const router = useRouter()

const getMainSubMenu = () => {
    if (props.item && props.item.mainSubMenu) {
        return props.item.mainSubMenu
    }
    return '';
}

const handleClick = (item) => {
    router.push(item && item.link ? item.link : "#")
}
</script>

<template>
    <div>
        <div class="w-[240px] flex cursor-pointer justify-center items-center menu-item-title" @click="handleClick(item)">
            {{ item && item.title ? item.title : '' }}
        </div>

        <div v-if="item.isSubmenu"
             class="menu-item-drop w-screen h-[600px] absolute left-0 justify-center items-center flex invisible opacity-0 overflow-hidden"
             :class="item && item.colorBg ? item.colorBg : ''">
            <div class="flex flex-row  items-start">
                <div
                    class="w-60 h-96 rounded-2xl mr-4 menu-item-image overflow-hidden cursor-pointer"
                    :class="item && item.colorItemSM ? item.colorItemSM : ''"
                    @click="handleClick(item)">
                    <div class="w-full h-full " :style="`background-image: url(${getMainSubMenu().img})`"></div>
                    <span class="text-white text-2xl">{{ getMainSubMenu().title }}</span>
                </div>

                <div v-if="item && item.children && item.children.length > 0" class="grid grid-cols-3 grid-rows-2 gap-4 justify-between ">
                    <SubMenuItem v-for="(i, index) in item.children"
                                 :key="index"
                                 :data="i"
                                 @click="handleClick(i)"
                                 :color-item-s-m="item && item.colorItemSM ? item.colorItemSM : ''"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>