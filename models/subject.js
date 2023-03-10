import {HTTP} from "../utils/http.js";

const quarterList = {
    "m": "Spring",
    "s": "Summer",
    "a": "Autumn",
    "w": "Winter",
};
const btnsName = [
    ["ExamPaper", "MarkSheme","Grade Threshold"],
    ["Free-Response Questions", "", "ScoringGuidelines"]
]

class SubjectModel extends HTTP {
    getSubjectList(courseId,callBack) {
        this.request({
            url: "/wxTopic/getSubjectList",
            data: {
                courseId: courseId
            },
            loading: true,
            success: function (res) {
                var length = res.parameter ? res.parameter.length:0;
                var data = res.parameter;
                for(var i=0;i<length;i++) {
                    data[i].title = res.parameter[i].name;
                    data[i].type = 0;//普通类型列表
                }
                for(var i=0; i<length; i++) {
                    var subjectName = data[i].name;
                    if(subjectName.substring(0, 4) == "Math" && i !=0) {
                    var temp = data[i];
                    data.splice(i,1);
                    data.unshift(temp);
                    break;
                  }
                }
                callBack(data);
            }
        });
    }

    getYearList(subjectId,callBack) {
        this.request({
            url: "/wxTopic/getYearList",
            data: {
                subjectId: subjectId
            },
            loading: true,
            success: function (res) {
                var length = res.parameter ? res.parameter.length: 0;
                var data = res.parameter;
                for (var i = 0; i < length; i++) {
                    data[i].title = res.parameter[i].year;
                    data[i].btns = new Array();
                    var quarterLength = data[i].quarterList ?data[i].quarterList.length: 0;
                    var monthLength = data[i].monthList ? data[i].monthList.length: 0;
                    for (var j = 0; j < quarterLength; j++) {
                        data[i].btns.push(quarterList[data[i].quarterList[j]]);
                    }
                    for (var j = 0; j < monthLength; j++) {
                        data[i].btns.push(data[i].monthList[j]);
                    }
                    data[i].type = data[i].btns.length==0? 0 : 1;//类型列表
                }
                callBack(data);
            }
        });
    }

    getLevelCodeList(params, callBack) {
        this.request({
            url: "/wxTopic/getLevelList",
            loading: true,
            data: params,
            success: function(res) {
                var length = res.parameter ? res.parameter.length : 0;
                var data = res.parameter;
                for(var i=0;i<length;i++) {
                    data[i].title = data[i].levelCode;
                    data[i].type = 0;
                }
                callBack(data);
            }
        });
    }

    getTopicList(params, callBack) {
        this.request({
            url: "/wxTopic/getTopicList",
            data: params,
            loading: true,
            success: function (res) {
                var length = res.parameter ? res.parameter.length:0;
                var data = res.parameter;
                for (var i = 0; i < length; i++) {
                    if (res.parameter[i].code) {
                        data[i].title = res.parameter[i].code;
                    } else if (res.parameter[i].levelCode) {
                        data[i].title = res.parameter[i].levelCode;
                    }else {
                        data[i].title = "";
                    }
                    data[i].btns = new Array();
                    data[i].paths = new Array();

                    if (res.parameter[i].qpPath){
                        if(data[i].courseId == 4) {
                          data[i].btns.push(btnsName[1][0]);
                        }else {
                          data[i].btns.push(btnsName[0][0]);
                        }
                        data[i].paths.push(res.parameter[i].qpPath);
                    }
                    if (res.parameter[i].msPath) {
                        if (data[i].courseId == 4) {
                          data[i].btns.push(btnsName[1][1]);
                        } else {
                          data[i].btns.push(btnsName[0][1]);
                        }
                        data[i].paths.push(res.parameter[i].msPath);
                    }
                    if (res.parameter[i].gtPath) {
                        if (data[i].courseId == 4) {
                          data[i].btns.push(btnsName[1][2]);
                        } else {
                          data[i].btns.push(btnsName[0][2]);
                        }
                        data[i].paths.push(res.parameter[i].gtPath);
                    } 
                    //data[i].btns = ["ExamPaper","MarkSheme","Grade Threshold"];
                    data[i].type = 2;//普通类型列表
                }
                callBack(data);
            }
        });
    }
}

export { SubjectModel}