<?php
/*
 * @Descripttion: 
 * @version: 
 * @Author: wzs
 * @Date: 2020-03-14 12:50:36
 * @LastEditors: wzs
 * @LastEditTime: 2020-03-14 21:19:38
 */
declare (strict_types = 1);

namespace app\common\core\interfaces;


interface InterfaceModel
{
	public static function saveData(array $data = [], array $where = []);

	public static function del(array $where = []);

	public static function findAll(array $where = [], array $order = ['create_time' => 'desc']);

	public static function findLimit(array $where = [], array $order = ['create_time' => 'desc'], int $offset = 0, int $length = 10);

	public static function findSingle(array $where = []);

	public static function changeState(array $where = []);
	
	public static function findPage(array $where = [], array $order = ['create_time' => 'desc'], int $page = 0, int $length = 10);
}