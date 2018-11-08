scss/
|
|
|——components/				#通用组件，header、footer、navbar等
|
|——modules/					#公共方法模块，集合mixin与function
|   |
|	|——_aniamtion.scss 		#动画模块
|	|——_compatibility.scss  #兼容性模块
|	|——_layout.scss 		#布局模块
|	|——_reset.scss 			#清除基础样式模块
|	|——_shapes.scss 		#绘图模块
|	|——_typography.scss 	#文本排版模块
|	|——_utilities.scss 		#辅助工具模块
|	|
|	|——common-modules.scss 	#入口文件，引入全部模块，样式文件调用该入口文件
|	|
|——pages/					#页面独有的样式部分，它们不应当被复用
|
|——vander/					#第三方样式文件
|
|——variables/				#项目变量