const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            activeTab: "sms",
            sms: {
                phone: "",
                code: "",
                sending: false,
                countdown: 0,
                timer: null,
                loggingIn: false
            }
        };
    },
    mounted() {
    },
    beforeUnmount() {
        this.clearSmsTimer();
    },
    methods: {
        isValidPhone: function (phone) {
            var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            return reg.test(phone);
        },
        buildUrl: function (path) {
            return window.BADGER_CONFIG.serverAddr + path;
        },
        clearSmsTimer: function () {
            if (this.sms.timer) {
                clearInterval(this.sms.timer);
                this.sms.timer = null;
            }
        },
        startSmsCountdown: function () {
            var that = this;
            this.sms.countdown = 60;
            this.clearSmsTimer();
            this.sms.timer = setInterval(function () {
                if (that.sms.countdown <= 1) {
                    that.clearSmsTimer();
                    that.sms.countdown = 0;
                    return;
                }
                that.sms.countdown -= 1;
            }, 1000);
        },
        sendSmsCode: function () {
            if (!this.isValidPhone(this.sms.phone)) {
                this.$message.error("手机号格式有误");
                return;
            }
            if (this.sms.sending || this.sms.countdown > 0) {
                return;
            }
            var that = this;
            this.sms.sending = true;
            var formData = new FormData();
            formData.append("phone", this.sms.phone);
            httpPost(this.buildUrl(window.BADGER_CONFIG.smsPath), formData, { "Content-Type": "multipart/form-data" }).then(function (resp) {
                if (resp && resp.code === 200) {
                    that.$message.success("短信发送成功");
                    that.startSmsCountdown();
                    return;
                }
                that.$message.error(resp && resp.msg ? resp.msg : "短信发送失败");
            }).finally(function () {
                that.sms.sending = false;
            });
        },
        mobileLogin: function () {
            if (!this.isValidPhone(this.sms.phone)) {
                this.$message.error("手机号格式有误");
                return;
            }
            if (!this.sms.code) {
                this.$message.error("请输入验证码");
                return;
            }
            var that = this;
            this.sms.loggingIn = true;
            var payload = {
                phone: this.sms.phone,
                code: this.sms.code
            };
            httpPost(this.buildUrl(window.BADGER_CONFIG.loginPath), payload).then(function (resp) {
                if (resp && resp.code === 200) {
                    var userId = resp.data && resp.data.userId ? resp.data.userId : "";
                    that.$message.success("登录成功" + (userId ? "，用户ID：" + userId : ""));
                    return;
                }
                that.$message.error(resp && resp.msg ? resp.msg : "登录失败");
            }).finally(function () {
                that.sms.loggingIn = false;
            });
        }
    }
});

app.use(ElementPlus);
app.mount("#app");
