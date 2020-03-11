<template>
    <div class="lumi-select">
        <label v-if="label">
            {{label}}
        </label>
        <select :name="name" :id="id" :value="selected">
            <option v-for="(item,key) in select_list"
            :key="key"
            :value="item.value">
                {{ item.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'lumi-select-box',
    model: {
        prop: 'selected',
        event: 'change',
    },
    props: {
        selected: null,
        label: String,
        name: {
            type: String,
            default: 'select'
        },
        id: {
            type: String,
            default: 'select'
        },
        select_list : {
            type: Array,
            required: true,
            validator(select_list){
                let check_properties = ['key','value','label'],
                    unique_keys = []

                let filtered = select_list.filter(item => {
                    let lost_property = check_properties.filter(property => !item.hasOwnProperty(property))
                    let duplicated = unique_keys.filter(compare => {
                        if(compare == item.key){
                            return true
                        } else {
                            unique_keys.push(item.val)
                            return false
                        }
                    })
                    return !(lost_property.length == 0 && duplicated.length == 0)
                })
                return filtered.length == 0
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>