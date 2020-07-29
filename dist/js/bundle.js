!function(e){var t={};function i(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(s,r,function(t){return e[t]}.bind(null,r));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=12)}([function(e,t){const i={empty:0,food:1,wall:2,mouth:3,producer:4,mover:5,killer:6,armor:7,colors:["#121D29","green","gray","orange","white","#3493eb","red","purple"],getRandomLivingType:function(){return Math.floor(5*Math.random())+3}};e.exports=i},function(e,t,i){const s=i(0),r=i(3);function o(e,t){for(var i of r.edibleNeighbors){l(e,t.grid_map.cellAt(e.col+i[0],e.row+i[1]),t)}}function l(e,t,i){null!=t&&t.type==s.food&&(i.changeCell(t.col,t.row,s.empty,null),e.owner.food_collected++)}function n(e,t){if(!e.owner.is_mover||r.moversCanProduce){var i=r.foodProdProb;if(100*Math.random()<=i){var o=r.growableNeighbors[Math.floor(Math.random()*r.growableNeighbors.length)],l=o[0],n=o[1],a=t.grid_map.cellAt(e.col+l,e.row+n);if(null!=a&&a.type==s.empty)return void t.changeCell(e.col+l,e.row+n,s.food,null)}}}function a(e,t){for(var i of r.killableNeighbors){h(e,t.grid_map.cellAt(e.col+i[0],e.row+i[1]))}}function h(e,t){if(null!=t&&null!=t.owner&&null!=e.owner&&t.owner!=e.owner&&t.owner.living&&t.type!=s.armor){var i=t.type==s.killer;t.owner.harm(),i&&e.owner.harm()}}e.exports=class{constructor(e,t,i,s,r){this.owner=null,this.setType(e),this.col=t,this.row=i,this.x=s,this.y=r,this.func=null}setType(e){switch(this.type=e,this.type){case s.mouth:this.func=o;break;case s.producer:this.func=n;break;case s.killer:this.func=a;break;default:this.func=null}}performFunction(e){null!=this.func&&this.func(this,e)}getColor(){return s.colors[this.type]}isLiving(){return this.type!=s.empty&&this.type!=s.food&&this.type!=s.wall}}},function(e,t,i){const s=i(1),r=i(0);e.exports=class{constructor(e,t,i){this.resize(e,t,i)}resize(e,t,i){this.grid=[],this.cols=e,this.rows=t,this.cell_size=i;for(var o=0;o<e;o++){for(var l=[],n=0;n<t;n++){var a=new s(r.empty,o,n,o*i,n*i);l.push(a)}this.grid.push(l)}}fillGrid(e){for(var t of this.grid)for(var i of t)i.setType(e),i.owner=null}cellAt(e,t){return this.isValidLoc(e,t)?this.grid[e][t]:null}setCellType(e,t,i){this.isValidLoc(e,t)&&this.grid[e][t].setType(i)}setCellOwner(e,t,i){this.isValidLoc(e,t)&&(this.grid[e][t].owner=i)}isValidLoc(e,t){return e<this.cols&&t<this.rows&&e>=0&&t>=0}getCenter(){return[Math.floor(this.cols/2),Math.floor(this.rows/2)]}xyToColRow(e,t){var i=Math.floor(e/this.cell_size),s=Math.floor(t/this.cell_size);return i>=this.cols?i=this.cols-1:i<0&&(i=0),s>=this.rows?s=this.rows-1:s<0&&(s=0),[i,s]}}},function(e,t,i){const s=i(4),r={setDefaults:function(){this.lifespanMultiplier=100,this.foodProdProb=4,this.foodProdProbScalar=4,this.killableNeighbors=s.adjacent,this.edibleNeighbors=s.adjacent,this.growableNeighbors=s.adjacent,this.useGlobalMutability=!1,this.globalMutability=5,this.addProb=33,this.changeProb=33,this.removeProb=33,this.moversCanRotate=!0,this.offspringRotate=!0,this.foodBlocksReproduction=!0,this.moversCanProduce=!1,this.instaKill=!1},calcProducerFoodRatio:function(e=!0){e?this.foodProdProb=100/this.lifespanMultiplier*this.foodProdProbScalar:this.lifespanMultiplier=Math.floor(100/(this.foodProdProb/this.foodProdProbScalar))},balanceMutationProbs:function(e){if(1==e){var t=100-this.addProb;this.changeProb=t/2,this.removeProb=t/2}else if(2==e){t=100-this.changeProb;this.addProb=t/2,this.removeProb=t/2}else{t=100-this.removeProb;this.changeProb=t/2,this.addProb=t/2}}};r.setDefaults(),e.exports=r},function(e,t){e.exports={all:[[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[1,1],[-1,1],[1,-1]],adjacent:[[0,1],[0,-1],[1,0],[-1,0]],corners:[[-1,-1],[1,1],[-1,1],[1,-1]],allSelf:[[0,0],[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[1,1],[-1,1],[1,-1]]}},function(e,t,i){const s=i(0),r=(i(1),i(2),i(14)),o=i(4),l=i(3),n=i(9);class a{constructor(e,t,i,s=null){this.c=e,this.r=t,this.env=i,this.lifetime=0,this.food_collected=0,this.living=!0,this.cells=[],this.is_producer=!1,this.is_mover=!1,this.direction=n.up,this.rotation=n.up,this.can_rotate=l.moversCanRotate,this.move_count=0,this.move_range=4,this.mutability=5,this.damage=0,null!=s&&this.inherit(s)}addCell(e,t,i){for(var s of this.cells)if(s.loc_col==t&&s.loc_row==i)return!1;return this.checkProducerMover(e),this.cells.push(new r(e,t,i)),!0}removeCell(e,t){if(0==e&&0==t)return!1;for(var i=!1,r=0;r<this.cells.length;r++){if((o=this.cells[r]).loc_col==e&&o.loc_row==t){o.type!=s.producer&&o.type!=s.mover||(i=!0),this.cells.splice(r,1);break}}if(i)for(var o of(this.is_producer=!1,this.is_producer=!1,this.cells))this.checkProducerMover(o.type);return!0}getLocalCell(e,t){for(var i of this.cells)if(i.loc_col==e&&i.loc_row==t)return i;return null}checkProducerMover(e){e==s.producer&&(this.is_producer=!0),e==s.mover&&(this.is_mover=!0)}inherit(e){for(var t of(this.move_range=e.move_range,this.mutability=e.mutability,e.cells))this.addCell(t.type,t.loc_col,t.loc_row)}foodNeeded(){return this.cells.length}lifespan(){return this.cells.length*l.lifespanMultiplier}maxHealth(){return this.cells.length}reproduce(){var e=new a(0,0,this.env,this);l.offspringRotate&&(e.rotation=n.getRandomDirection());var t=this.mutability;l.useGlobalMutability?t=l.globalMutability:Math.random()<=.5?e.mutability++:(e.mutability--,e.mutability<1&&(e.mutability=1)),100*Math.random()<=t&&e.mutate();var i=n.getRandomScalar(),s=i[0],r=i[1],o=Math.floor(3*Math.random()),h=Math.min(2+this.cells.length,25),c=this.c+s*h+s*o,d=this.r+r*h+r*o;e.isClear(c,d)&&e.isStraightPath(c,d,this.c,this.r,this)&&(e.c=c,e.r=d,this.env.addOrganism(e),e.updateGrid()),this.food_collected-=this.foodNeeded()}mutate(){var e=Math.floor(100*Math.random()),t=!1;if(e<=l.addProb){var i=s.getRandomLivingType(),r=(Math.floor(3*Math.random()),this.cells[Math.floor(Math.random()*this.cells.length)]),n=o.all[Math.floor(Math.random()*o.all.length)],a=r.loc_col+n[0],h=r.loc_row+n[1];t=this.addCell(i,a,h)}else if(e<=l.addProb+l.changeProb){var c=this.cells[Math.floor(Math.random()*this.cells.length)];c.type=s.getRandomLivingType(),this.checkProducerMover(c.type),t=!0}else e<=l.addProb+l.changeProb+l.removeProb&&this.cells.length>1&&(c=this.cells[Math.floor(Math.random()*this.cells.length)],t=this.removeCell(c.loc_col,c.loc_row));return this.is_mover&&(this.move_range+=Math.floor(4*Math.random())-2,this.move_range<=0&&(this.move_range=1)),t}attemptMove(){var e=n.scalars[this.direction],t=e[0],i=e[1],r=this.c+t,o=this.r+i;if(this.isClear(r,o)){for(var l of this.cells){var a=this.c+l.rotatedCol(this.rotation),h=this.r+l.rotatedRow(this.rotation);this.env.changeCell(a,h,s.empty,null)}return this.c=r,this.r=o,this.updateGrid(),!0}return!1}attemptRotate(){if(!this.can_rotate)return this.direction=n.getRandomDirection(),this.move_count=0,!0;var e=n.getRandomDirection();if(this.isClear(this.c,this.r,e)){for(var t of this.cells){var i=this.c+t.rotatedCol(this.rotation),r=this.r+t.rotatedRow(this.rotation);this.env.changeCell(i,r,s.empty,null)}return this.rotation=e,this.direction=n.getRandomDirection(),this.updateGrid(),this.move_count=0,!0}return!1}isStraightPath(e,t,i,s,r){if(e==i){if(t>s){var o=s;s=t,t=o}for(var l=t;l!=s;l++){var n=this.env.grid_map.cellAt(e,l);if(!this.isPassableCell(n,r))return!1}return!0}if(e>i){o=i;i=e,e=o}for(l=e;l!=i;l++){n=this.env.grid_map.cellAt(l,t);if(!this.isPassableCell(n,r))return!1}return!0}isPassableCell(e,t){return null!=e&&(e.type==s.empty||e.owner==this||e.owner==t||e.type==s.food)}isClear(e,t,i=this.rotation){for(var r of this.cells){var o=this.getRealCell(r,e,t,i);if(null==o)return!1;if(o.owner!=this&&o.type!=s.empty&&(l.foodBlocksReproduction||o.type!=s.food))return!1}return!0}harm(){this.damage++,(this.damage>=this.maxHealth()||l.instaKill)&&this.die()}die(){for(var e of this.cells){var t=this.c+e.rotatedCol(this.rotation),i=this.r+e.rotatedRow(this.rotation);this.env.changeCell(t,i,s.food,null)}this.living=!1}updateGrid(){for(var e of this.cells){var t=this.c+e.rotatedCol(this.rotation),i=this.r+e.rotatedRow(this.rotation);this.env.changeCell(t,i,e.type,this)}}update(){if(this.lifetime++,this.lifetime>this.lifespan())return this.die(),this.living;for(var e of(this.food_collected>=this.foodNeeded()&&this.reproduce(),this.cells))this.getRealCell(e).performFunction(this.env);if(!this.living)return this.living;if(this.is_mover){this.move_count++;this.attemptMove();this.move_count>this.move_range&&this.attemptRotate()}return this.living}getRealCell(e,t=this.c,i=this.r,s=this.rotation){var r=t+e.rotatedCol(s),o=i+e.rotatedRow(s);return this.env.grid_map.cellAt(r,o)}}e.exports=a},function(e,t){e.exports={None:0,FoodDrop:1,WallDrop:2,ClickKill:3,Select:4,Edit:5,Clone:6,Drag:7}},function(e,t){e.exports=class{constructor(){}update(){alert("Environment.update() must be overriden")}changeCell(e,t,i,s){this.grid_map.setCellType(e,t,i),this.grid_map.setCellOwner(e,t,s)}}},function(e,t){e.exports=class{constructor(e,t,i){this.cell_size=i,this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext("2d"),this.fillWindow(t),this.height=this.canvas.height,this.width=this.canvas.width,this.cells_to_render=new Set,this.cells_to_highlight=new Set,this.highlighted_cells=new Set}fillWindow(e){this.fillShape($("#"+e).height(),$("#"+e).width())}fillShape(e,t){this.canvas.width=t,this.canvas.height=e,this.height=this.canvas.height,this.width=this.canvas.width}clear(){this.ctx.fillStyle="white",this.ctx.fillRect(0,0,this.height,this.width)}renderFullGrid(e){for(var t of e)for(var i of t)this.ctx.fillStyle=i.getColor(),this.ctx.fillRect(i.x,i.y,this.cell_size,this.cell_size)}renderCells(){for(var e of this.cells_to_render)this.renderCell(e);this.cells_to_render.clear()}renderCell(e){this.ctx.fillStyle=e.getColor(),this.ctx.fillRect(e.x,e.y,this.cell_size,this.cell_size)}renderOrganism(e){for(var t of e.cells){var i=e.getRealCell(t);this.renderCell(i)}}addToRender(e){this.highlighted_cells.has(e)&&this.cells_to_highlight.add(e),this.cells_to_render.add(e)}renderHighlights(){for(var e of this.cells_to_highlight)this.renderCellHighlight(e),this.highlighted_cells.add(e);this.cells_to_highlight.clear()}highlightOrganism(e){for(var t of e.cells){var i=e.getRealCell(t);this.cells_to_highlight.add(i)}}highlightCell(e){this.cells_to_highlight.add(e)}renderCellHighlight(e,t="yellow"){this.renderCell(e),this.ctx.fillStyle=t,this.ctx.globalAlpha=.5,this.ctx.fillRect(e.x,e.y,this.cell_size,this.cell_size),this.ctx.globalAlpha=1,this.highlighted_cells.add(e)}clearAllHighlights(e=!1){for(var t of this.highlighted_cells)this.renderCell(t);this.highlighted_cells.clear(),e&&this.cells_to_highlight.clear()}}},function(e,t){const i={up:0,down:1,left:2,right:3,scalars:[[0,-1],[0,1],[-1,0],[1,0]],getRandomDirection:function(){return Math.floor(4*Math.random())},getRandomScalar:function(){return this.scalars[Math.floor(Math.random()*this.scalars.length)]}};e.exports=i},function(e,t){e.exports=class{constructor(e,t){this.env=e,this.canvas=t,this.mouse_x,this.mouse_y,this.mouse_c,this.mouse_r,this.left_click=!1,this.right_click=!1,this.cur_cell=null,this.cur_org=null,this.highlight_org=!0,this.defineEvents()}setControlPanel(e){this.control_panel=e}defineEvents(){this.canvas.addEventListener("mousemove",e=>{this.updateMouseLocation(e.offsetX,e.offsetY),this.mouseMove()}),this.canvas.addEventListener("mouseup",function(e){e.preventDefault(),this.updateMouseLocation(e.offsetX,e.offsetY),this.mouseUp(),this.left_click=!1,this.right_click=!1}.bind(this)),this.canvas.addEventListener("mousedown",function(e){e.preventDefault(),this.updateMouseLocation(e.offsetX,e.offsetY),0==e.button&&(this.left_click=!0),2==e.button&&(this.right_click=!0),this.mouseDown()}.bind(this)),this.canvas.addEventListener("contextmenu",(function(e){e.preventDefault()})),this.canvas.addEventListener("mouseleave",function(){this.right_click=!1,this.left_click=!1,this.env.renderer.clearAllHighlights(!0)}.bind(this))}updateMouseLocation(e,t){var i=this.cur_cell,s=this.cur_org;this.mouse_x=e,this.mouse_y=t;var r=this.env.grid_map.xyToColRow(this.mouse_x,this.mouse_y);this.mouse_c=r[0],this.mouse_r=r[1],this.cur_cell=this.env.grid_map.cellAt(this.mouse_c,this.mouse_r),this.cur_org=this.cur_cell.owner,this.cur_org==s&&this.cur_cell==i||(this.env.renderer.clearAllHighlights(!0),null!=this.cur_org&&this.highlight_org?this.env.renderer.highlightOrganism(this.cur_org):null!=this.cur_cell&&this.env.renderer.highlightCell(this.cur_cell,!0))}mouseMove(){alert("mouse move must be overridden")}mouseDown(){alert("mouse down must be overridden")}mouseUp(){alert("mouse up must be overridden")}}},function(e,t,i){const s=i(13),r=i(16),o=i(17);e.exports=class{constructor(){this.fps=60,this.env=new s(4),this.organism_editor=new o,this.controlpanel=new r(this),this.env.OriginOfLife(),this.last_update=Date.now(),this.delta_time=0,this.actual_fps=0,this.running=!1}start(e=60){e<=0&&(e=1),e>300&&(e=300),this.fps=e,this.game_loop=setInterval(function(){this.environmentUpdate()}.bind(this),1e3/e),this.running=!0,this.fps>=60?null!=this.render_loop&&(clearInterval(this.render_loop),this.render_loop=null):this.setRenderLoop()}stop(){clearInterval(this.game_loop),this.running=!1,this.setRenderLoop()}setRenderLoop(){null==this.render_loop&&(this.render_loop=setInterval(function(){this.necessaryUpdate()}.bind(this),1e3/60))}environmentUpdate(){this.delta_time=Date.now()-this.last_update,this.last_update=Date.now(),this.env.update(this.delta_time),this.actual_fps=1/this.delta_time*1e3,null==this.render_loop&&this.necessaryUpdate()}necessaryUpdate(){this.env.render(),this.controlpanel.update(),this.organism_editor.update()}}},function(e,t,i){"use strict";i.r(t);var s=i(11),r=i.n(s);$("document").ready((function(){(function(){let e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e})()&&(alert("Though the simulation still works on mobile, most features are disabled. Try it on desktop for the full experience!"),$(".control-panel").css("display","none")),(new r.a).start(60)}))},function(e,t,i){const s=i(7),r=(i(2),i(8)),o=i(2),l=i(5),n=i(0),a=(i(1),i(15));e.exports=class extends s{constructor(e){super(),this.renderer=new r("env-canvas","env",e),this.controller=new a(this,this.renderer.canvas);var t=Math.floor(this.renderer.height/e),i=Math.floor(this.renderer.width/e);this.grid_map=new o(i,t,e),this.renderer.renderFullGrid(this.grid_map.grid),this.organisms=[],this.walls=[],this.total_mutability=0,this.auto_reset=!0,this.largest_cell_count=0,this.reset_count=0}update(e){var t=[];for(var i in this.organisms){var s=this.organisms[i];s.living&&s.update()||t.push(i)}this.removeOrganisms(t)}render(){this.renderer.renderCells(),this.renderer.renderHighlights()}removeOrganisms(e){for(var t of e.reverse())this.total_mutability-=this.organisms[t].mutability,this.organisms.splice(t,1);0==this.organisms.length&&this.auto_reset&&(this.reset_count++,this.reset())}OriginOfLife(){var e=this.grid_map.getCenter(),t=new l(e[0],e[1],this);t.addCell(n.mouth,0,0),t.addCell(n.producer,-1,-1),t.addCell(n.producer,1,1),this.addOrganism(t)}addOrganism(e){e.updateGrid(),this.total_mutability+=e.mutability,this.organisms.push(e),e.cells.length>this.largest_cell_count&&(this.largest_cell_count=e.cells.length)}averageMutability(){return this.organisms.length<1?0:this.total_mutability/this.organisms.length}changeCell(e,t,i,s){super.changeCell(e,t,i,s),this.renderer.addToRender(this.grid_map.cellAt(e,t)),i==n.wall&&this.walls.push(this.grid_map.cellAt(e,t))}clearWalls(){for(var e of this.walls)this.grid_map.cellAt(e.col,e.row).type==n.wall&&this.changeCell(e.col,e.row,n.empty,null)}clearOrganisms(){for(var e of this.organisms)e.die();this.organisms=[]}reset(e=!0){this.organisms=[],this.grid_map.fillGrid(n.empty),this.renderer.renderFullGrid(this.grid_map.grid),this.total_mutability=0,this.OriginOfLife()}resizeGridColRow(e,t,i){this.renderer.cell_size=e,this.renderer.fillShape(i*e,t*e),this.grid_map.resize(t,i,e),this.reset()}resizeFillWindow(e){this.renderer.cell_size=e,this.renderer.fillWindow("env");var t=Math.floor(this.renderer.width/e),i=Math.floor(this.renderer.height/e);this.grid_map.resize(t,i,e),this.reset()}}},function(e,t,i){i(0);const s=i(9);i(3);e.exports=class{constructor(e,t,i){this.type=e,this.loc_col=t,this.loc_row=i}rotatedCol(e){switch(e){case s.up:return this.loc_col;case s.down:return-1*this.loc_col;case s.left:return this.loc_row;case s.right:return-1*this.loc_row}}rotatedRow(e){switch(e){case s.up:return this.loc_row;case s.down:return-1*this.loc_row;case s.left:return-1*this.loc_col;case s.right:return this.loc_col}}}},function(e,t,i){const s=i(10),r=i(5),o=i(6),l=i(0),n=i(4);i(1);e.exports=class extends s{constructor(e,t){super(e,t),this.mode=o.Drag,this.org_to_clone=null,this.defineZoomControls(),this.scale=1}defineZoomControls(){var e=1;const t=document.querySelector("#env-canvas");t.onwheel=function(i){i.preventDefault();var s=-1*Math.sign(i.deltaY);e=Math.max(.5,e+.5*s),t.style.transform=`scale(${e})`,this.scale=e}.bind(this)}resetView(){$("#env-canvas").css("transform","scale(1)"),$("#env-canvas").css("top","0px"),$("#env-canvas").css("left","0px"),this.scale=1}updateMouseLocation(e,t){super.updateMouseLocation(e,t)}mouseMove(){this.performModeAction()}mouseDown(){this.start_x=this.mouse_x,this.start_y=this.mouse_y,this.performModeAction()}mouseUp(){}performModeAction(){var e=this.mode,t=this.right_click,i=this.left_click;if(e!=o.None&&(t||i)){var s=this.cur_cell;if(null==s)return;switch(e){case o.FoodDrop:i?this.dropCellType(s.col,s.row,l.food,!1):t&&this.dropCellType(s.col,s.row,l.empty,!1);break;case o.WallDrop:i?this.dropCellType(s.col,s.row,l.wall,!0):t&&this.dropCellType(s.col,s.row,l.empty,!1);break;case o.ClickKill:this.killNearOrganisms();break;case o.Select:null==this.cur_org&&(this.cur_org=this.findNearOrganism()),null!=this.cur_org&&this.control_panel.setEditorOrganism(this.cur_org);break;case o.Clone:if(null!=this.org_to_clone){var n=new r(this.mouse_c,this.mouse_r,this.env,this.org_to_clone);n.isClear(this.mouse_c,this.mouse_r)&&this.env.addOrganism(n)}break;case o.Drag:var a=parseInt($("#env-canvas").css("top"),10),h=parseInt($("#env-canvas").css("left"),10),c=a+(this.mouse_y-this.start_y)*this.scale,d=h+(this.mouse_x-this.start_x)*this.scale;$("#env-canvas").css("top",c+"px"),$("#env-canvas").css("left",d+"px")}}}dropCellType(e,t,i,s=!1){for(var r of n.allSelf){var o=e+r[0],l=t+r[1],a=this.env.grid_map.cellAt(o,l);if(null!=a){if(s&&null!=a.owner)a.owner.die();else if(null!=a.owner)continue;this.env.changeCell(o,l,i,null)}}}findNearOrganism(){for(var e of n.all){var t=this.cur_cell.col+e[0],i=this.cur_cell.row+e[1],s=this.env.grid_map.cellAt(t,i);if(null!=s.owner)return s.owner}return null}killNearOrganisms(){for(var e of n.allSelf){var t=this.cur_cell.col+e[0],i=this.cur_cell.row+e[1],s=this.env.grid_map.cellAt(t,i);null!=s.owner&&s.owner.die()}}}},function(e,t,i){const s=i(3),r=i(6);i(0);e.exports=class{constructor(e){this.engine=e,this.defineMinMaxControls(),this.defineEngineSpeedControls(),this.defineGridSizeControls(),this.defineTabNavigation(),this.defineHyperparameterControls(),this.defineModeControls(),this.defineChallenges(),this.fps=e.fps,this.organism_record=0,this.env_controller=this.engine.env.controller,this.editor_controller=this.engine.organism_editor.controller,this.env_controller.setControlPanel(this),this.editor_controller.setControlPanel(this)}defineMinMaxControls(){$("#minimize").click((function(){$(".control-panel").css("display","none"),$(".hot-controls").css("display","block")})),$("#maximize").click((function(){$(".control-panel").css("display","grid"),$(".hot-controls").css("display","none")}))}defineEngineSpeedControls(){this.slider=document.getElementById("slider"),this.slider.oninput=function(){this.fps=this.slider.value,this.engine.running&&this.changeEngineSpeed(this.fps),$("#fps").text("Target FPS: "+this.fps)}.bind(this),$(".pause-button").click(function(){$(".pause-button").find("i").toggleClass("fa fa-pause"),$(".pause-button").find("i").toggleClass("fa fa-play"),this.engine.running?this.engine.stop():this.engine.running||this.engine.start(this.fps)}.bind(this))}defineGridSizeControls(){$("#fill-window").change((function(){this.checked?$(".col-row-input").css("display","none"):$(".col-row-input").css("display","block")})),$("#resize").click(function(){var e=$("#cell-size").val();if($("#fill-window").is(":checked"))this.engine.env.resizeFillWindow(e);else{var t=$("#col-input").val(),i=$("#row-input").val();this.engine.env.resizeGridColRow(e,t,i)}}.bind(this))}defineTabNavigation(){var e=this;$(".tabnav-item").click((function(){$(".tab").css("display","none");var t="#"+this.id+".tab";e.engine.organism_editor.is_active="editor"==this.id,$(t).css("display","grid")}))}defineHyperparameterControls(){$("#food-prod-prob").change(function(){var e=$("#food-prod-prob").val();$("#fixed-ratio").is(":checked")?(s.foodProdProb=e,s.calcProducerFoodRatio(!1),$("#lifespan-multiplier").val(s.lifespanMultiplier)):s.foodProdProb=e}.bind(this)),$("#lifespan-multiplier").change(function(){var e=$("#lifespan-multiplier").val();$("#fixed-ratio").is(":checked")?(s.lifespanMultiplier=e,s.calcProducerFoodRatio(!0),$("#food-prod-prob").val(s.foodProdProb)):s.lifespanMultiplier=e}.bind(this)),$("#mover-rot").change((function(){s.moversCanRotate=this.checked})),$("#offspring-rot").change((function(){s.offspringRotate=this.checked})),$("#insta-kill").change((function(){s.instaKill=this.checked})),$("#evolved-mutation").change((function(){this.checked?($(".global-mutation-in").css("display","none"),$("#avg-mut").css("display","block")):($(".global-mutation-in").css("display","block"),$("#avg-mut").css("display","none")),s.useGlobalMutability=!this.checked})),$("#global-mutation").change((function(){s.globalMutability=$("#global-mutation").val()})),$(".mut-prob").change((function(){switch(this.id){case"add-prob":s.addProb=this.value,s.balanceMutationProbs(1);break;case"change-prob":s.changeProb=this.value,s.balanceMutationProbs(2);break;case"remove-prob":s.removeProb=this.value,s.balanceMutationProbs(3)}$("#add-prob").val(Math.floor(s.addProb)),$("#change-prob").val(Math.floor(s.changeProb)),$("#remove-prob").val(Math.floor(s.removeProb))})),$("#movers-produce").change((function(){s.moversCanProduce=this.checked})),$("#food-blocks").change((function(){s.foodBlocksReproduction=this.checked})),$("#reset-rules").click((function(){s.setDefaults(),$("#food-prod-prob").val(s.foodProdProb),$("#lifespan-multiplier").val(s.lifespanMultiplier),$("#fixed-ratio").prop("checked",!0),$("#mover-rot").prop("checked",s.moversCanRotate),$("#offspring-rot").prop("checked",s.offspringRotate),$("#insta-kill").prop("checked",s.instaKill),$("#evolved-mutation").prop("checked",!s.useGlobalMutability),$("#add-prob").val(s.addProb),$("#change-prob").val(s.changeProb),$("#remove-prob").val(s.removeProb),$("#movers-produce").prop("checked",s.moversCanProduce),$("#food-blocks").prop("checked",s.foodBlocksReproduction),s.useGlobalMutability?($(".global-mutation-in").css("display","block"),$("#avg-mut").css("display","none")):($(".global-mutation-in").css("display","none"),$("#avg-mut").css("display","block"))}))}defineModeControls(){var e=this;$(".edit-mode-btn").click((function(){e.env_controller.mode;switch($("#cell-selections").css("display","none"),this.id){case"food-drop":e.setMode(r.FoodDrop);break;case"wall-drop":e.setMode(r.WallDrop);break;case"click-kill":e.setMode(r.ClickKill);break;case"select":e.setMode(r.Select);break;case"edit":e.setMode(r.Edit),$("#cell-selections").css("display","block");break;case"drop-org":e.setMode(r.Clone),e.env_controller.org_to_clone=e.engine.organism_editor.getCopyOfOrg();break;case"drag-view":e.setMode(r.Drag)}$(".edit-mode-btn").css("background-color","#9099c2"),$("#"+this.id).css("background-color","#81d2c7")})),$(".reset-view").click(function(){this.env_controller.resetView()}.bind(this));var t=this.engine.env;$("#reset-env").click(function(){this.engine.env.reset()}.bind(this)),$("#auto-reset").change((function(){t.auto_reset=this.checked})),$("#clear-walls").click(function(){confirm("Are you sure you want to clear all the walls?")&&this.engine.env.clearWalls()}.bind(this)),$("#clear-editor").click(function(){this.engine.organism_editor.clear()}.bind(this))}defineChallenges(){$(".challenge-btn").click((function(){$("#challenge-title").text($(this).text()),$("#challenge-description").text($(this).val())}))}setMode(e){this.env_controller.mode=e,this.editor_controller.mode=e}setEditorOrganism(e){this.engine.organism_editor.setOrganismToCopyOf(e)}changeEngineSpeed(e){this.engine.stop(),this.engine.start(e),this.fps=this.engine.fps}update(){$("#fps-actual").text("Actual FPS: "+Math.floor(this.engine.actual_fps));var e=this.engine.env.organisms.length;$("#org-count").text("Organism count:  "+e),e>this.organism_record&&(this.organism_record=e),$("#org-record").text("Highest count: "+this.organism_record),$("#avg-mut").text("Average Mutation Rate: "+Math.round(100*this.engine.env.averageMutability())/100),$("#largest-org").text("Largest Organism: "+this.engine.env.largest_cell_count+" cells"),$("#reset-count").text("Auto reset count: "+this.engine.env.reset_count),this.editor_controller.env.organism.cells.length>1?$("#editor-cell-count").text(this.editor_controller.env.organism.cells.length+" cells"):$("#editor-cell-count").text("1 cell")}}},function(e,t,i){const s=i(7),r=i(5),o=i(2),l=i(8),n=i(0),a=i(18);i(1);e.exports=class extends s{constructor(){super(),this.is_active=!0;this.renderer=new l("editor-canvas","editor-env",13),this.controller=new a(this,this.renderer.canvas),this.grid_map=new o(15,15,13),this.clear(),this.renderer.renderFullGrid(this.grid_map.grid)}update(){this.is_active&&this.renderer.renderHighlights()}changeCell(e,t,i,s){super.changeCell(e,t,i,s),this.renderer.renderFullGrid(this.grid_map.grid)}addCellToOrg(e,t,i){var s=this.grid_map.getCenter(),r=e-s[0],o=t-s[1],l=this.organism.getLocalCell(r,o);null!=l?(l.type=i,this.changeCell(e,t,i,this.organism)):this.organism.addCell(i,r,o)&&this.changeCell(e,t,i,this.organism)}removeCellFromOrg(e,t){var i=this.grid_map.getCenter(),s=e-i[0],r=t-i[1];0!=s||0!=r?null!=this.organism.getLocalCell(s,r)&&this.organism.removeCell(s,r)&&this.changeCell(e,t,n.empty,null):alert("Cannot remove center cell")}setOrganismToCopyOf(e){this.grid_map.fillGrid(n.empty);var t=this.grid_map.getCenter();this.organism=new r(t[0],t[1],this,e),this.organism.updateGrid()}getCopyOfOrg(){return new r(0,0,null,this.organism)}clear(){this.grid_map.fillGrid(n.empty);var e=this.grid_map.getCenter();this.organism=new r(e[0],e[1],this,null),this.organism.addCell(n.mouth,0,0),this.organism.updateGrid()}}},function(e,t,i){const s=i(10),r=i(6),o=i(0);e.exports=class extends s{constructor(e,t){super(e,t),this.mode=r.None,this.edit_cell_type=null,this.highlight_org=!1,this.defineCellTypeSelection()}mouseMove(){(this.right_click||this.left_click)&&this.editOrganism()}mouseDown(){this.editOrganism()}mouseUp(){}editOrganism(){null!=this.edit_cell_type&&this.mode==r.Edit&&(this.left_click&&this.env.addCellToOrg(this.mouse_c,this.mouse_r,this.edit_cell_type),this.right_click&&this.env.removeCellFromOrg(this.mouse_c,this.mouse_r))}defineCellTypeSelection(){var e=this;$(".cell-type").click((function(){switch(this.id){case"mouth":e.edit_cell_type=o.mouth;break;case"producer":e.edit_cell_type=o.producer;break;case"mover":e.edit_cell_type=o.mover;break;case"killer":e.edit_cell_type=o.killer;break;case"armor":e.edit_cell_type=o.armor}$(".cell-type").css("border-color","black");var t="#"+this.id+".cell-type";$(t).css("border-color","yellow")}))}}}]);