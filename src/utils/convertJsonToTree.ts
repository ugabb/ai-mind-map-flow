import { nanoid } from "nanoid/non-secure";
import {NodeProps} from '@xyflow/react';

const jsonToTree = (data: any, newNode: NodeProps, isRoot = false) => {
    const node: NodeProps = {
      id: nanoid(),
      key: "",
      value: {},
      positionAbsoluteX:  0,
      positionAbsoluteY: 0,
      data: { label: "" },
      dragging: false,
      isConnectable: true,
      type: "square",
      zIndex: 0,
      parentId: newNode.id,
      children: [],
    };

    Object.entries(data).forEach(([key, value]) => {
    
      if (
        typeof value !== "object" &&
        
        !Array.isArray(value)
      ) {
        if(isRoot == true){
          newNode.key = key;
          newNode.value[key] = value; 
        }else{
          node.key = newNode.key + '-children';
          node.value[key] = value;
        }
        
      } else if ( Array.isArray(value)) {
        const valObjectFind = value.find((val) => typeof val === "object");

        if (valObjectFind) {
          const childNode: NodeProps = {
            id: nanoid(),
            key: key,
            value: key,
            positionAbsoluteX:  0,
            positionAbsoluteY: 0,
            data: { label: "" },
            dragging: false,
            isConnectable: true,
            type: "square",
            zIndex: 0,
            parentId: (isRoot) ? newNode.id :  node.id,
            children: [],

          };
          value.forEach((valueFromArray) =>{
            if(typeof valueFromArray === 'object'){
              jsonToTree(valueFromArray, childNode);
            }else{
              const childNodeForPropertyWithValueArray: NodeProps = {
                id: nanoid(),
                key: childNode.key + '-children',
                value: {},
                positionAbsoluteX:  0,
                positionAbsoluteY: 0,
                data: { label: "" },
                dragging: false,
                isConnectable: true,
                type: "square",
                zIndex: 0,
                parentId: childNode.id,
                children: [],
              }

              childNodeForPropertyWithValueArray.value = valueFromArray;
              if(childNode.children) childNode.children.push(childNodeForPropertyWithValueArray);
            }
          })
          if(isRoot){
            if (!newNode.children) {
              newNode.children = [];
            }
            newNode.children.push(childNode);
          }else{
            if (!node.children) {
              node.children = [];
            }
            node.children.push(childNode);
          }
        } else {
          const childNodeAddition: NodeProps = {
            id: nanoid(),
            key: "",
            value: {},
            positionAbsoluteX:  0,
            positionAbsoluteY: 0,
            data: { label: "" },
            dragging: false,
            isConnectable: true,
            type: "square",
            zIndex: 0,
            parentId: node.id,
            children: [],
          };
          childNodeAddition.key = key;
          childNodeAddition.value = key;
          for (let i = 0; i < value.length; i++) {
            const childChildNode: NodeProps = {
              id: nanoid(),
              key: key + "-child",
              value: {},
              positionAbsoluteX:  0,
              positionAbsoluteY: 0,
              data: { label: "" },
              dragging: false,
              isConnectable: true,
              type: "square",
              zIndex: 0,
              parentId: childNodeAddition.id,
              children: [],
            };
            childChildNode.value = value[i];
            if(childNodeAddition.children) childNodeAddition.children.push(childChildNode);
          }
          // newNode.children.push(childNodeAddition);
          if(node.children) node.children.push(childNodeAddition);
        }
      } else {
        const childNode: NodeProps = {
          id: nanoid(),
          key: key,
          value: key,
          positionAbsoluteX:  0,
          positionAbsoluteY: 0,
          data: { label: "" },
          dragging: false,
          isConnectable: true,
          type: "square",
          zIndex: 0,
          parentId: (isRoot) ? newNode.id : node.id,
          children: [],
        };
        
        jsonToTree(value, childNode);
        if(isRoot){
           if(newNode.children)newNode.children.push(childNode);
        }else{
           if(node.children)node.children.push(childNode);
        }
      }
     
    });
    if(isRoot !== true){
      if(newNode.children) newNode.children.push(node);
    }else{
      newNode.key = 'root'
    }
    return newNode;
  }

  
  function convertJsonToTree(json: any){

    const rootNode: NodeProps = {
        id: nanoid(),
        key: "root",
        type: "square",
        dragging: false,
        zIndex: 0,
        isConnectable: true,
        data: { label: "root" },
        positionAbsoluteX:  0,
        positionAbsoluteY: 0,
        parentId: "root",
        value: {},
        children: [],
    };

      jsonToTree(json, rootNode, true);
      return rootNode;
  }


  export default convertJsonToTree;