import Describe = require("./Describe");
import BeforeEach = require("./BeforeEach");
import AfterEach = require("./AfterEach");
import It = require("./It");

type mix = Describe & BeforeEach & AfterEach & It;

export = mix;