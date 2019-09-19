const Toast = {
	state: {
		show: false,
		msg: ''
	},

	mutations: {
		showToast(state, data) {
			state.msg = data.msg;
			state.show = true;
			data.duration = data.duration || 3000;
			setTimeout(() => {
				state.show = false;
			}, data.duration);
		}
	}
}

export default Toast;
