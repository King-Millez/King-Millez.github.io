import { useState } from "react";
import "./Wipe.css";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Scene } from "three";

export default function Wipe(props: {
  loader: OBJLoader;
  urls: string[];
  scene: Scene;
}) {
  const [objLoading, setObjLoading] = useState(true);

  var done = 0;

  props.urls.forEach((url) => {
    props.loader.load(
      url,
      (object) => {
        object.position.set(20, 0, 20);
        object.scale.set(1.6, 1.6, 1.6);
        props.scene.add(object);
        done++;
      },
      function (xhr) {
        console.log(Math.round((xhr.loaded / xhr.total) * 100) + "% loaded");
        if (xhr.loaded === xhr.total) {
          setObjLoading(done == props.urls.length);
        }
      },
      function () {
        console.log("An error happened");
      }
    );
  });

  return (
    <div
      className={`wipe ${
        objLoading ? "bg-green-600" : "bg-[rgb(0,0,0,0)]"
      } w-full z-[1] transition ease-in-out  duration-300 h-full absolute`}
    >
      {objLoading ? (
        <p className="z-[2] text-2xl">Loading</p> /* I don't know
      why the z-index has to be set here. */
      ) : (
        <></>
      )}
    </div>
  );
}
