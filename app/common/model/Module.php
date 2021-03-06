<?php
/*
 * @Descripttion: 模型模型
 * @version: 1.0.0
 * @Author: wzs
 * @Date: 2020-03-13 20:36:26
 * @LastEditors: wzs
 * @LastEditTime: 2020-03-13 20:46:26
 */
declare (strict_types = 1);

namespace app\common\model;

use app\BaseModel;

class Module extends BaseModel
{
	public function role()
	{
		return $this->belongsTo(Role::class);
	}
}