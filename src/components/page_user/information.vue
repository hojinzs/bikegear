<template>
    <div>
        <!-- Show After Loading -->
        <div v-if="userdata">
            <table>
                <tr>
                    <th>
                        이미지
                    </th>
                    <td>
                        <img :src="editable.profile" />
                    </td>
                    <td>
                        <button class="lumi-button-liner">변경하기</button>
                    </td>
                </tr>
                <tr>
                    <th>
                        이름
                    </th>
                    <td>
                        <input class="lumi-input-liner" v-model="editable.name" />
                    </td>
                    <td>
                        <button class="lumi-button-liner">변경하기</button>
                    </td>
                </tr>
                <tr>
                    <th>
                        이메일
                    </th>
                    <td>
                        <input class="lumi-input-liner" v-model="editable.email" />
                    </td>
                    <td>
                        <span v-if="userdata.email_verified_at">인증완료</span>
                        <span v-else>인증필요</span>
                        <button class="lumi-button-liner">인증하기</button>
                    </td>
                </tr>

            </table>
        </div>

        <div>
            <h3>Provider</h3>
            <table>
                <tr>
                    <th>
                        Strava
                    </th>
                    <td>
                        프로필 (로그인)
                    </td>
                    <td>
                        활동 읽기
                    </td>
                </tr>
            </table>
        </div>

<!--        <div>-->
<!--            <h2>Sample</h2>-->
<!--            {{ userdata }}-->
<!--        </div>-->

    </div>
</template>

<script>
export default {
    name: "UserInformation",
    props: {
        userdata: {
            type: Object,
            // require: true
        }
    },
    data(){
        return {
            editable: {
                profile: '',
                name: '',
                email: '',
            }
        }
    },
    created() {
        console.log("GET userData => ", this.userdata)
    },
    mounted() {
        this.editable = {
            profile: this.userdata.profile,
            name: this.userdata.name,
            email: this.userdata.email,
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>