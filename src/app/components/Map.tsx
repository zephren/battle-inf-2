/// <reference path="../typescript-definitions/D3Force.d.ts" />
/// <reference path="../typescript-definitions/ReactForceGraph.d.ts" />

import * as React from "react";
import Store from "../lib/store";
import { ForceGraph2D } from "react-force-graph";
import { forceLink, forceCollide } from "d3-force";
import map from "../config/map";
import GameActions from "../lib/game-actions";

export default class Map extends React.Component {
  state: {
    parentElement?: any;
    graphData?: any;
    currentLocation?: string;
    nodesLinks?: any;
  } = {};

  fg: any = null;

  constructor(props: any) {
    super(props);

    this.state.graphData = this.buildNodesLinks();
  }

  shouldComponentUpdate(nextPros: Readonly<{}>) {
    const state = Store.getState();
    const newNodesLinks = this.buildNodesLinks();

    if (this.state.currentLocation !== state.currentLocation) {
      this.state.currentLocation = state.currentLocation;
      this.state.graphData = newNodesLinks;
      console.log("MAP UPDATE 1");
      return true;
    }

    // console.log(this.state.graphData, newNodesLinks);
    if (this.state.graphData.nodes.length !== newNodesLinks.nodes.length) {
      this.state.graphData = newNodesLinks;
      console.log("MAP UPDATE 2");
      return true;
    }

    return false;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        parentElement: document.getElementById("main-content")
      });

      // Location of the nodes and their data
      console.log(this.fg.props.graphData.nodes);

      // Control link distance
      this.fg.d3Force(
        "link",
        forceLink()
          .strength((d: any) => {
            return 2;
          })
          .distance((d: any) => {
            return 100;
          })
      );

      // Push nodes away from eachother
      this.fg.d3Force(
        "collide",
        forceCollide(function(d: any) {
          return 50;
        })
      );
    });
  }

  clickedNode(node: any) {
    const state = Store.getState();

    state.currentLocation = node.id;

    Store.update();

    GameActions.saveState();
  }

  buildNodesLinks() {
    const data: any = {
      nodes: [],
      links: []
    };

    const nodesByName: any = {};

    for (const node of map.nodes) {
      nodesByName[node.name] = node;
    }

    for (const node of map.nodes) {
      if (node.isAvailable()) {
        data.nodes.push({ id: node.name, val: 50 });
      }

      if (node.connectsTo) {
        for (const nodeName of node.connectsTo) {
          if (nodesByName[nodeName].isAvailable()) {
            data.links.push({ source: node.name, target: nodeName });
          }
        }
      }
    }

    return data;
  }

  render() {
    const state = Store.getState();

    if (!this.state.parentElement) {
      return null;
    }

    const box = this.state.parentElement.getBoundingClientRect();

    return (
      <div>
        <ForceGraph2D
          ref={(el: any) => (this.fg = el)}
          graphData={this.state.graphData}
          onNodeClick={this.clickedNode}
          // linkDirectionalArrowLength={3.5}
          // linkDirectionalArrowRelPos={1}
          linkCurvature={0}
          linkWidth={10}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={10}
          enableNodeDrag={false}
          width={box.width}
          height={box.height - 20}
          d3AlphaDecay={0.002}
          d3VelocityDecay={0.4}
          // backgroundColor="#444"
          linkColor={() => "#666"}
          linkDirectionalParticleColor={() => "#FFF"}
          nodeLabel="id"
          cooldownTicks={1}
          warmupTicks={100} // Skips jittery startup
          nodeCanvasObject={(node: any, ctx: any) => {
            const { id, x, y } = node;

            if (state.currentLocation === id) {
              ctx.fillStyle = "#FFF";
            } else {
              ctx.fillStyle = "#AAA";
            }

            ctx.fillRect(x - 10, y - 10, 20, 20);

            if (state.currentLocation === id) {
              ctx.lineWidth = 2;
              ctx.strokeStyle = "green";
              ctx.strokeRect(x - 10, y - 10, 20, 20);
            }

            ctx.fillStyle = "#FFF";
            ctx.font = "10px Sans-Serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(id, x, y + 20);
          }}
        />
      </div>
    );
  }
}
