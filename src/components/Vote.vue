<!-- @format -->

<template>
	<h1 class="align-center">Live Text Vote <button class="reset" @click="resetVote">reset vote</button></h1>
	<h2>Vote Line: +1 (501) 466 4389</h2>
	<div>Watch for live update when your vote is cast.</div>
	<div>
		<div class="align-end">
			<div :style="{ width: markWidth }" class="voteLevel background-blue">
				Mark ({{ parseFloat(markWidth) / 70 }})
			</div>
			<img src="../assets/images/Guy.png" :width="markImageWidth" alt="" />
		</div>
		<h3>Text "1" to vote for Mark</h3>
		<div class="align-end">
			<div :style="{ width: joanWidth }" class="voteLevel background-green">
				Joan ({{ parseFloat(joanWidth) / 70 }})
			</div>
			<img src="../assets/images/AfroFem.png" :width="joanImageWidth" alt="" />
		</div>
		<h3>Text "2" to vote for Joan</h3>

		<div class="align-end">
			<div :style="{ width: steveWidth }" class="voteLevel background-red">
				Steve ({{ parseFloat(steveWidth) / 70 }})
			</div>
			<img src="../assets/images/IndianMan.png" :width="steveImageWidth" alt="" />
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

		markImageWidth.value = 150 + increment(Mark, 20);
		joanImageWidth.value = 150 + increment(Joan, 20);
		steveImageWidth.value = 150 + increment(Steve, 20);
	});
</script>

<style scoped>
	.voteLevel {
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
		background-color: transparent;
	}

	.align-center {
		display: flex;
		align-items: center;
	}

	.align-end {
		display: flex;
		align-items: end;
		height: 175px;
	}
</style>
