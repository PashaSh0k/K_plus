import React from "react";
import {BiSolidRightArrow} from "react-icons/bi"
import { BsQuestionCircleFill } from 'react-icons/bs'

class Risk9 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ans: [false],
            click: [false],
            isClicked: false,
            visible: [false]
        };
        this.handleAnswer1 = this.handleAnswer1.bind(this);
        this.ClickToBlock = this.ClickToBlock.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    quests = [
        {
           number: 1,
           question: 'Знаете ли Вы о привлечении истца в качестве ответчика?',
           answer: 'Риск есть.',
           ansCheck: false,
           help: false
        }
     ]
    ClickToBlock = (event) => {
        if (event.target.tagName !== 'BUTTON') {
            this.setState((prevState) => ({
                isClicked: !prevState.isClicked
            }));
        }
    };

    handleAnswer1 = (answer) => {
        this.setState((prevState) => ({
            click: prevState.click.map((item, index) => (index === 0 ? true : item))
        }));
        if (answer === 'да') {
            this.setState((prevState) => ({
                ans: prevState.ans.map((item, index) => (index === 0 ? false : item))
            }));
        } else {
            this.setState((prevState) => ({
                ans: prevState.ans.map((item, index) => (index === 0 ? true : item))
            }));
        }
    };
    handleMouseEnter = (index) => {
        const updatedVisible = [...this.state.visible];
        updatedVisible[index] = true;
        this.setState({ visible: updatedVisible });
     };
  
     handleMouseLeave = (index) => {
        const updatedVisible = [...this.state.visible];
        updatedVisible[index] = false;
        this.setState({ visible: updatedVisible });
     };

    render() {
        const { ans, click, isClicked, visible } = this.state;
        const tooltips = [
            `Ответчик на момент заключения сделки `
         ];
        return (
           <div className="Risk">
                <div className="RiskName">
                    <BiSolidRightArrow
                        className={`RiskIcon ${isClicked ? 'rotated' : ''}`}
                        onClick={this.ClickToBlock}
                    />
                    <h3>Риск №11:  Продавец-Ответчик в судах общей юрисдикции</h3>
                </div>
               {this.state.isClicked && (
                    <div>
                        <div className="Question">
                            <div className="QuestTool">
                                <p>{this.quests[0].question}</p> 
                                <BsQuestionCircleFill
                                    className="QuestIcon"
                                    onMouseEnter={() => this.handleMouseEnter(0)}
                                    onMouseLeave={() => this.handleMouseLeave(0)}
                                />
                                <div className="ToolContainer">
                                    <div
                                        className="Tooltip"
                                        onMouseEnter={() => this.handleMouseEnter(0)}
                                        onMouseLeave={() => this.handleMouseLeave(0)}
                                        style={{
                                            display: visible[0] ? "block" : "none"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: tooltips[0] }}
                                    >
                                    </div>
                                </div>
                            </div>
                            <button className={`ans-btn ${click[0] && !ans[0] ? 'active' : ''}`} onClick={() => this.handleAnswer1('да')}>Да</button>
                            <button className={`ans-btn ${click[0] && ans[0] ? 'active' : ''}`} onClick={() => this.handleAnswer1('нет')}>Нет</button>
                        </div>
                        {click[0] && (
                        <div>
                            {!ans[0] ? (
                            <div className="Answer">
                                <p>Риска нет.</p>
                            </div>
                            ) : (
                            <div className="Answer">
                                <p>{this.quests[0].answer}</p>
                            </div>
                            )}
                        </div>
                        )}
                    </div>
               )}
           </div>
        );
    }
}

export default Risk9;
