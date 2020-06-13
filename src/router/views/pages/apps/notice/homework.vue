<template>
    <div class="row">
        <div class="col-12">
            <div class="board">
                <!-- todo tasks -->
                <div class="tasks border" style="width: 100%">
                    <!--<h5 class="mt-0 task-header header-title"-->
                    <!--&gt;Todo <span class="font-size-13">({{ todoTasks.length }})</span>-->
                    <!--</h5>-->

                    <div id="task-list-one" class="task-list-items">
                        <draggable v-model="todoTasks" v-bind="dragOptions">
                            <transition-group type="transition" :name="'flip-list'">
                                <div v-for="task in todoTasks" :key="task.id">
                                    <Task :task="task" />
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
                <!-- end - todo tasks -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homework"
    }
</script>