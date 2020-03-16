/**
 * 后台JS主入口
 */

let path = window.location.pathname;

let layer = layui.layer,
	laydate = layui.laydate,
	form = layui.form,
	upload = layui.upload;
/**
 * AJAX全局设置
 */
$.ajaxSetup({
	type: "post",
	dataType: "json"
});

/**
 * 后台侧边菜单选中状态
 */
$('.layui-nav-item').find('a').removeClass('layui-this');
$('.layui-nav-tree').find('a[href*="' + path + '"]').parent().addClass('layui-this').parents('.layui-nav-item').addClass('layui-nav-itemed');
console.log(layui)
/**
 * 通用单图上传
 */
upload.render({
	url: "/admin/upload/upload",
	type: 'image',
	ext: 'jpg|png|gif|bmp',
	success: function (data, control) {
		if (data.error === 0) {
			console.log(control);
			if (control) {
				$(control).parent().parent().prev().val(data.url);
			}
		} else {
			layer.msg(data.message);
		}
	}
});

/**
 * 复制文章链接
 */
$('.copy-url').on('click', function () {
	var url = this.children[0];
	url.select();
	document.execCommand("Copy");
	layer.msg('复制成功');
});

/**
 * 通用日期时间选择
 */
$('.datetime').on('click', function () {
	laydate({
		elem: this,
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss'
	})
});

/**
 * 通用表单提交(AJAX方式)
 */
form.on('submit(*)', function (data) {
	$.ajax({
		url: data.form.action,
		type: data.form.method,
		data: $(data.form).serialize(),
		success: function (info) {
			if (info.code === 1) {
				setTimeout(function () {
					parent.layer.close(parent.layer.getFrameIndex(window.name));
					window.location.reload();
				}, 1000);
			}
			layer.msg(info.msg);
		}
	});

	return false;
});

/**
 * 通用批量处理（审核、取消审核、删除）
 */
$('.ajax-action').on('click', function () {
	var _action = $(this).data('action');
	layer.open({
		shade: false,
		content: '确定执行此操作？',
		btn: ['确定', '取消'],
		yes: function (index) {
			$.ajax({
				url: _action,
				data: $('.ajax-form').serialize(),
				success: function (info) {
					if (info.code === 1) {
						setTimeout(function () {
							window.location.reload();
						}, 1000);
					}
					layer.msg(info.msg);
				}
			});
			layer.close(index);
		}
	});

	return false;
});

/**
 * 通用全选
 */
$('.check-all').on('click', function () {
	$(this).parents('table').find('input[type="checkbox"]').prop('checked', $(this).prop('checked'));
});

/**
 * 通用删除
 */
$('.ajax-delete').on('click', function () {
	var _href = $(this).attr('href');
	layer.open({
		shade: false,
		content: '确定删除？',
		btn: ['确定', '取消'],
		yes: function (index) {
			$.ajax({
				url: _href,
				type: "get",
				success: function (info) {
					if (info.code === 1) {
						setTimeout(function () {
							window.location.reload();
						}, 1000);
					}
					layer.msg(info.msg);
				}
			});
			layer.close(index);
		}
	});
	return false;
});

/**
 * 清除缓存
 */
$('#clear-cache').on('click', function () {
	var _url = $(this).data('url');
	if (_url !== 'undefined') {
		$.ajax({
			url: _url,
			success: function (data) {
				if (data.code === 1) {
					setTimeout(function () {
						location.href = location.pathname;
					}, 1000);
				}
				layer.msg(data.msg);
			}
		});
	}
	return false;
});

$('body').off('click','.form').on('click','.form',function () {
	var view = $(this).data('url');
	console.log(view)
	layer.open({
		title: ['表单'],
		type: 2,
		anim: 4,
		skin: 'layui-layer', //加上边框
		shadeClose: true,
		area: ['700px', '800px'], //宽高
		content: view //调到新增页面
	});
});