<!-- @format -->

<template>
	<div class="header-container">
		<!-- <h1 class="align-center">Live SMS Vote <button class="reset" @click="resetVote">reset vote</button></h1> -->
		<h1>
			SMS VOTE LINE <span class="nowrap">+1 (530) SMS VOTE </span>
			<span class="large-font text-margin phone-no nowrap"> +1 (530) 767 8683</span>
		</h1>

		<div>
			Watch for live update when your vote is cast.<button class="reset" @click="resetVote">
				reset vote
			</button>
		</div>
	</div>
	<div>
		<div class="vote-element">
			<div :style="{ width: markWidth }" class="vote-level background-blue">
				Mark ({{ parseFloat(markWidth) / 70 }})
			</div>
			<img src="../assets/images/Guy.png" :width="markImageWidth" alt="Mark" />
		</div>
		<h3>Text "1" to vote for Mark</h3>
		<div class="vote-element">
			<div :style="{ width: joanWidth }" class="vote-level background-green">
				Joan ({{ parseFloat(joanWidth) / 70 }})
			</div>
			<img src="../assets/images/AfroFem.png" :width="joanImageWidth" alt="Joan" />
		</div>
		<h3>Text "2" to vote for Joan</h3>

		<div class="vote-element">
			<div :style="{ width: steveWidth }" class="vote-level background-red">
				Steve ({{ parseFloat(steveWidth) / 70 }})
			</div>
			<img src="../assets/images/YoungGuyGlasses.png" :width="steveImageWidth" alt="Steve" />
		</div>
		<h3>Text "3" to vote for Steve</h3>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { db } from "../firebase/config";
	import { setDoc, doc, onSnapshot } from "firebase/firestore";

	const increment = (votecount, num) => {
		return votecount * num;
	};

	const markWidth = ref("35px");
	const joanWidth = ref("35px");
	const steveWidth = ref("35px");

	const markImageWidth = ref(150);
	const joanImageWidth = ref(150);
	const steveImageWidth = ref(150);

	const resetVote = async () => {
		await setDoc(doc(db, "elections", "exampleVote"), {
			Mark: 0,
			Joan: 0,
			Steve: 0,
		});
	};

	onSnapshot(doc(db, "elections", "exampleVote"), (doc) => {
		const { Mark, Joan, Steve } = doc.data();
		markWidth.value = increment(Mark, 70) + "px";
		joanWidth.value = increment(Joan, 70) + "px";
		steveWidth.value = increment(Steve, 70) + "px";

		markImageWidth.value = 150 + increment(Mark, 15);
		joanImageWidth.value = 150 + increment(Joan, 15);
		steveImageWidth.value = 150 + increment(Steve, 15);
	});
</script>

<style scoped>
	.vote-level {
		color: white;
		height: 35px;
		min-width: 35px;
		font-size: large;
		margin: 35px 0px 0px 0px;
		padding: 20px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: end;
		border-radius: 5px;
	}

	.reset {
		margin-left: 20px;
		padding: 6px;
		cursor: pointer;
		border-radius: 5px;
		background-color: white;
		border: none;
	}

	.align-center {
		display: flex;
		align-items: center;
	}

	.align-end {
		display: flex;
		align-items: end;
	}

	.vote-element {
		display: flex;
		align-items: end;
		height: 170px;
	}

	.text-margin {
		margin: 0px 20px 0px 20px;
	}

	.phone-no {
		font-weight: medium;
	}

	.justify-center {
		display: flex;
		justify-content: center;
	}

	.header-container {
		background-color: #dcdcdc;
		padding: 15px;
		border-radius: 10px;
		margin-bottom: 35px;
	}

	h1 {
		font-family: "Archivo Black", sans-serif;
	}

	.nowrap {
		white-space: nowrap;
	}
</style>
